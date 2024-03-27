const { sequelize } = require('../db')
const { DataTypes } = require("sequelize");

const Product = sequelize.define('Product', {
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
    sku: {
        type: DataTypes.STRING,
        validate: {
            min: 3,
        }
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
    },
    price: {
        type: DataTypes.DOUBLE,
    },
    discountPrice: {
        type: DataTypes.DOUBLE,
    },
    quantity: {
        type: DataTypes.DOUBLE,
    },
    weight: {
        type: DataTypes.DOUBLE,
    },
    length: {
        type: DataTypes.DOUBLE,
    },
    height: {
        type: DataTypes.DOUBLE,
    },
    width: {
        type: DataTypes.DOUBLE,
    },
    imageOne: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
    imageTwo: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
    imageThree: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
    imageFour: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
    imageFive: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
    needsInstallation: {
        type: DataTypes.BOOLEAN,
    },
    installationPrice: {
        type: DataTypes.DOUBLE,
    },
    colors:{
        type: DataTypes.STRING
    },
    shortDescription: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
    fullDescription: {
        type: DataTypes.TEXT,
        validate: {
            min: 3,
        }
    },
})


module.exports = Product
