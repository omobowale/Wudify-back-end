// Routes for all category activities
const router = require("express").Router()
const Category = require("../models_old/Category")
const { categoryCreationValidator } = require("../helpers/validators")
const { validationResult } = require("express-validator")
const { EMAIL_ALREADY_EXISTS, CATEGORY_ALREADY_EXISTS } = require("../helpers/constants")
const { getErrorData, getSuccessData } = require("../helpers/responses")
const verifyToken = require("../middlewares/verifyToken")
const { generateRandomString } = require("../helpers/generators")



const extractCategoryDetails = (category) => {
    return { id: category.id, slug: category.slug, name: category.name, shortDescription: category.shortDescription, label: category.label }
}

// Add middleware to all endpoints here
router.use(verifyToken)

// Endpoint to return all categories
router.get("/", async (req, res) => {

    try {
        const categories = await Category.aggregate([
            {
                $lookup: {
                    from: 'subcategories',
                    localField: 'id',
                    foreignField:  'productCategoryId',
                    as: 'subCategories'
                },
            }
        ]);
        return res.status(200).json(getSuccessData(200, categories));
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorData(500, err))
    }

})

// Endpoint to return a single category by id
router.get("/:id", async (req, res) => {

    const cat_id = req.params.id

    try {
        const category = await Category.findOne({ _id: cat_id });
        if (!category) {
            return res.status(404).json(getErrorData(404, [{ errorMessage: "Category does not exist" }]))
        }
        return res.status(200).json(getSuccessData(200, category));
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorData(500, err))
    }

})

// Endpoint to create a new category
router.post("/", categoryCreationValidator, async (req, res) => {

    //extract form details
    const { name, slug, label, shortDescription } = req.body

    //validate inputs
    const errors = validationResult(req)

    const id = generateRandomString();


    // send errors back
    if (!errors.isEmpty()) {
        res.status(500).json(getErrorData(500, errors.array()));
        return;
    }

    // Check if category already exists
    const categoryExists = await Category.findOne({ name, slug });
    if (categoryExists) {
        res.status(403).json(getErrorData(403, [{ errorMessage: CATEGORY_ALREADY_EXISTS() }]));
        return;
    }

    const newCategory = new Category({
       id, name, slug, shortDescription, label
    })

    try {
        const savedCategory = await newCategory.save()
        res.status(201).json(getSuccessData(201, extractCategoryDetails(savedCategory)))
    } catch (err) {
        res.status(500).json(getErrorData(500, err));
    }
})


// Endpoint to update a category
// This action will be performed by admin in future
router.put("/:id", async (req, res) => {

    const cat_id = req.params.id;

    //Check if category exists
    const updatedCategory = await Category.findOneAndUpdate({ _id: cat_id }, {
        $set: req.body
    }, { new: true });

    if (!updatedCategory) {
        res.status(403).json(getErrorData(403, [{ errorMessage: "Category does not exist" }]));
        return;
    }

    res.status(201).json(getSuccessData(201, extractCategoryDetails(updatedCategory)))

});

// Endpoint to delete a category
// This action will be performed by admin in future
router.delete("/:id", async (req, res) => {

    const cat_id = req.params.id;

    //Check if category exists
    const deletedCategory = await Category.findOneAndDelete({ _id: cat_id }, {
        $set: req.body
    }, { new: true });

    if (!deletedCategory) {
        res.status(403).json(getErrorData(403, [{ errorMessage: "Category does not exist" }]));
        return;
    }

    res.status(201).json(getSuccessData(201, extractCategoryDetails(deletedCategory)))

});


module.exports = router