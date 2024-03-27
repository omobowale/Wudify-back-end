const mongoose = require("mongoose")

const SubCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        thumbnailImagePath: { type: String, required: true},
        productCategoryId: { type: String, required: true },
    }, { timestamps: true }
)

module.exports = mongoose.model("SubCategory", SubCategorySchema)
