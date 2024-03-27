const express = require("express");
const mongoose = require("mongoose")
const {sequelize, connectToDb} = require("./db")
const dotenv = require("dotenv")
const cors = require("cors")
const usersRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const categoriesRoutes = require("./routes/categories")
const subCategoriesRoutes = require("./routes/subcategories")
const productsRoutes = require("./routes/products")

const app = express()

dotenv.config();

const uri = process.env.MONGO_URL;


// Connect to MongoDB
mongoose.connect(uri).then(() => {
    console.log("Successfully connected to db")
}).catch(err => { console.log(err) })

// Connect to MYSQL


app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/subcategories", subCategoriesRoutes);
app.use("/api/products", productsRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to development backend" })
})

app.listen(process.env.PORT || 8000, async () => {
    console.log("Backend server is running")
    await connectToDb()
})