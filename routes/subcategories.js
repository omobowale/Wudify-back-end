// Routes for all sub category activities
const router = require("express").Router()
const models = require("../models")
const { subCategoryCreationValidator } = require("../helpers/validators")
const { validationResult } = require("express-validator")
const { getErrorData, getSuccessData } = require("../helpers/responses")
const { generateRandomString } = require("../helpers/generators")
const verifyToken = require("../middlewares/verifyToken")
const { sequelize } = require('../db')

const Category = models.Category
const Subcategory = models.Subcategory



const extractSubCategoryDetails = (subCategory) => {
    return { id: subCategory.id, thumbnailImagePath: subCategory.thumbnailImagePath, name: subCategory.name, productCategoryId: subCategory.productCategoryId }
}

// Add middleware to all endpoints here
router.use(verifyToken)

// Endpoint to return all subcategories
router.get("/", async (req, res) => {

    try {
        const subCategories = await Subcategory.findAll({
            include: 'Category',
        });
        return res.status(200).json(getSuccessData(200, subCategories));
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorData(500, err))
    }
})

// Endpoint to return a single sub category by id
router.get("/:id", async (req, res) => {

    const sub_cat_id = req.params.id

    try {
        const subCategory = await Subcategory.findOne({ where: { id: sub_cat_id }, include: 'Category' });

        console.log("its category", await subCategory.getCategory());
        if (!subCategory) {
            return res.status(404).json(getErrorData(404, [{ errorMessage: "Subcategory does not exist" }]))
        }


        return res.status(200).json(getSuccessData(200, subCategory));
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorData(500, err))
    }

})

// Endpoint to create a new sub category
router.post("/", subCategoryCreationValidator, async (req, res) => {

    //extract form details
    const { name, thumbnailImagePath, productCategoryId } = req.body

    //validate inputs
    const errors = validationResult(req)


    // send errors back
    if (!errors.isEmpty()) {
        res.status(500).json(getErrorData(500, errors.array()));
        return;
    }

    //check if categoryId exists
    const category = await Category.findOne({ where: { id: productCategoryId } })

    if (!category) {
        res.status(403).json(getErrorData(403, [{ errorMessage: "Selected category does not exist" }]));
        return;
    }

    // Check if sub category already exists
    const subCategoryExists = await Subcategory.findOne({ where: { name } });
    if (subCategoryExists) {
        res.status(403).json(getErrorData(403, [{ errorMessage: "Sub category already exists" }]));
        return;
    }

    // Generate random id
    const guid = generateRandomString()


    try {
        let newSubCategory = await Subcategory.create({
            name, thumbnailImagePath, guid, categoryId: productCategoryId
        })

        console.log("new sub category", await newSubCategory.getCategory());
        // const savedSubCategory = await newSubcategory.save()
        res.status(201).json(getSuccessData(201, extractSubCategoryDetails(newSubCategory)))
    } catch (err) {
        res.status(500).json(getErrorData(500, err));
    }

})


// Endpoint to update a sub category
// This action will be performed by admin in future
router.put("/:id", async (req, res) => {

    const sub_cat_id = req.params.id;

    try {

        //Check if sub category exists
        const updatedSubCategory = await Subcategory.update(
            { ...req.body },
            {
                where: {
                    id: sub_cat_id
                },
                returning: true,
                plain: true
            });

        if (!updatedSubCategory) {
            res.status(403).json(getErrorData(403, [{ errorMessage: "Something went wrong" }]));
            return;
        }

        if (updatedSubCategory[1] == 0) {
            res.status(403).json(getErrorData(403, [{ errorMessage: "Sub category does not exist" }]));
            return;
        }

        console.log("cat", updatedSubCategory);
        res.status(201).json(getSuccessData(201, extractSubCategoryDetails(updatedSubCategory)))

    } catch (err) {
        res.status(50).json(getErrorData(50, [{ ...err }]));
        return;
    }




});

// Endpoint to delete a sub category
// This action will be performed by admin in future
router.delete("/:id", async (req, res) => {

    const sub_cat_id = req.params.id;

    try {

        //Check if sub category exists
        const deletedSubCategory = await Subcategory.delete({ where: { id: sub_cat_id } });

        if (!deletedSubCategory) {
            res.status(403).json(getErrorData(403, [{ errorMessage: "Category does not exist" }]));
            return;
        }

        res.status(201).json(getSuccessData(201, extractSubCategoryDetails(deletedSubCategory)))
    } catch (err) {
        res.status(500).json(getErrorData(500, [{ ...err }]));
        return;
    }


});


module.exports = router