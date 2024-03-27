const { sequelize } = require('../db')
const { DataTypes } = require("sequelize");


const Category = sequelize.define('Category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    guid: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            min: 3,
        }
    },
    slug: {
        type: DataTypes.STRING,
        validate: {
            min: 3,
        }
    },
    label: {
        type: DataTypes.STRING,
        validate: {
            min: 3,
        }
    },
    shortDescription: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
})

Category.associate = function (models) {
    Category.hasMany(models.SubCategory, { foreignKey: "categoryId", as: "subcategory" })
};

sequelize.sync({ alter: true })

module.exports = Category
