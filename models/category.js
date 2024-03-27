

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Subcategory);
    }
  }
  Category.init({
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
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};






