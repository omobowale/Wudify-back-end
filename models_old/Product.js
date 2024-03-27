const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        sku: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number, required: true },
        productCategoryId: { type: String, required: true },
        productSubCategoryId: { type: String, required: true },
        quantity: { type: Number, required: true },
        weight: { type: Number, required: true },
        length: { type: Number, required: true },
        height: { type: Number, required: true },
        width: { type: Number, required: true },
        shortDescription: { type: String, required: true },
        fullDescription: { type: String, required: true },
        imageOne: { type: String, required: true },
        imageTwo: { type: String, required: true },
        imageThree: { type: String, required: true },
        imageFour: { type: String },
        imageFive: { type: String },
        colors: { type: Array },
        needsInstallation: { type: Boolean },
        installationPrice: { type: Number },
    }, { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema)
