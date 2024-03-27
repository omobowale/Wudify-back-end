'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
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
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING,
        validate: {
          min: 3,
        }
      },
      label: {
        type: Sequelize.STRING,
        validate: {
          min: 3,
        }
      },
      shortDescription: {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
    
  }
};