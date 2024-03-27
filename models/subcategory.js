'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category)

    }
  }
  Subcategory.init({
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
    },
  }, {
    sequelize,
    modelName: 'Subcategory',
  });
  return Subcategory;
};

