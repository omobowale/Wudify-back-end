const { sequelize } = require('../db')
const { DataTypes } = require("sequelize");


const SubCategory = sequelize.define('SubCategory', {
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
    thumbnailImagePath: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {         // User belongsTo Company 1:1
            model: 'category',
            key: 'id'
        }
    },
})

SubCategory.associate = function (models) {
    SubCategory.belongsTo(models.Category, { foreignKey: "categoryId", as: "category" })
};

// sequelize.sync({ alter: true })
module.exports = SubCategory
