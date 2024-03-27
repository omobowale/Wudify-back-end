'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subcategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guid: {
        type: Sequelize.TEXT,
        validate: {
          min: 3,
        }
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          min: 3,
        }
      },
      name: {
        type: Sequelize.STRING
      },
      thumbnailImagePath: {
        type: Sequelize.TEXT,
        validate: {
          min: 3,
        }
      },  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addColumn(
      'Subcategories', // name of Source model
      'categoryId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subcategories');
    await queryInterface.removeColumn(
      'Subcategories', // name of Source model
      'categoryId' // key we want to remove
    );
  }
};

