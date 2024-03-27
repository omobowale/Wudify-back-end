const { sequelize } = require('../db')
const { DataTypes } = require("sequelize");

const Type = sequelize.define('Type', {
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
})

sequelize.sync()

module.exports = Type
