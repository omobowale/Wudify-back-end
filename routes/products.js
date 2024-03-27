// Routes for all sub category activities
const router = require("express").Router()
const SubCategory = require("../models_old/SubCategory")
const Product = require("../models_old/Product")
const { productCreationValidator } = require("../helpers/validators")
const { validationResult } = require("express-validator")
const { getErrorData, getSuccessData } = require("../helpers/responses")
const verifyToken = require("../middlewares/verifyToken");

const extractProductDetails = (product) => {
    return {
        id: product._id,
        name: product.name,
        color: product.colors,
        sku: product.sku,
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: product.quantity,
        imageOne: product.imageOne,
        imageTwo: product.imageTwo,
        imageThree: product.imageThree,
        imageFour: product.imageFour,
        imageFive: product.imageFive,
        productCategoryId: product.productCategoryId,
        productSubCategoryId: product.productSubCategoryId,
        weight: product.weight,
        length: product.length,
        height: product.height,
        width: product.width,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        needsInstallation: product.needsInstallation,
        installationPrice: product.installationPrice,
    }
}

// Add middleware to all endpoints here
router.use(verifyToken)

// Endpoint to return all products
router.get("/", async (req, res) => {

    try {
        const products = await Product.find();
        return res.status(200).json(getSuccessData(200, products));
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorData(500, err))
    }
})

// Endpoint to return a single product by id
router.get("/:id", async (req, res) => {

    const prod_id = req.params.id

    try {
        const product = await Product.findOne({ _id: prod_id });
        if (!product) {
            return res.status(404).json(getErrorData(404, [{ errorMessage: "Product does not exist" }]))
        }
        return res.status(200).json(getSuccessData(200, product));
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorData(500, err))
    }

})

// Endpoint to create a new product
router.post("/", productCreationValidator, async (req, res) => {

    //extract form details
    const {
        id,
        name,
        color,
        sku,
        price,
        discountPrice,
        quantity,
        imageOne,
        imageTwo,
        imageThree,
        imageFour,
        imageFive,
        productCategoryId,
        productSubCategoryId,
        weight,
        length,
        height,
        width,
        shortDescription,
        fullDescription,
        needsInstallation,
        installationPrice,
    } = req.body

    //validate inputs
    const errors = validationResult(req)


    // send errors back
    if (!errors.isEmpty()) {
        res.status(500).json(getErrorData(500, errors.array()));
        return;
    }

    // Check if product already exists
    const productExists = await Product.findOne({ sku });
    if (productExists) {
        res.status(403).json(getErrorData(403, [{ errorMessage: "Product already exists" }]));
        return;
    }

    const newProduct = new Product({
        id,
        name,
        color,
        sku,
        price,
        discountPrice,
        quantity,
        imageOne,
        imageTwo,
        imageThree,
        imageFour,
        imageFive,
        productCategoryId,
        productSubCategoryId,
        weight,
        length,
        height,
        width,
        shortDescription,
        fullDescription,
        needsInstallation,
        installationPrice,
    })

    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(getSuccessData(201, extractProductDetails(savedProduct)))
    } catch (err) {
        res.status(500).json(getErrorData(500, err));
    }
})


// Endpoint to update a product
// This action will be performed by admin in future
router.put("/:id", async (req, res) => {

    const prod_id = req.params.id;

    //Check if sub category exists
    const updatedProduct = await Product.findOneAndUpdate({ _id: prod_id }, {
        $set: req.body
    }, { new: true });

    if (!updatedProduct) {
        res.status(403).json(getErrorData(403, [{ errorMessage: "Product does not exist" }]));
        return;
    }

    res.status(201).json(getSuccessData(201, extractProductDetails(updatedProduct)))

});

// Endpoint to delete a product
// This action will be performed by admin in future
router.delete("/:id", async (req, res) => {

    const prod_id = req.params.id;

    //Check if product exists
    const deletedProduct = await Product.findOneAndDelete({ _id: prod_id }, {
        $set: req.body
    }, { new: true });

    if (!deletedProduct) {
        res.status(403).json(getErrorData(403, [{ errorMessage: "Category does not exist" }]));
        return;
    }

    res.status(201).json(getSuccessData(201, extractProductDetails(deletedProduct)))

});


module.exports = router