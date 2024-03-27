const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        label: { type: String },
        shortDescription: { type: String, required: true, unique: true }
    }, { timestamps: true }
)



module.exports = mongoose.model("Category", CategorySchema)
