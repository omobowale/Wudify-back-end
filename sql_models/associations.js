const Category = require("./Category")
const SubCategory = require("./SubCategory")
const Type = require("./Type")
const Product = require("./Product")
const { sequelize } = require('../db')

Category.hasMany(SubCategory, { foreignKey: "categoryId", as: "subcategory" });
SubCategory.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

SubCategory.hasMany(Type);
Type.belongsTo(SubCategory);

Type.hasMany(Product);
Product.belongsTo(Type);

sequelize.sync({ alter: true })
