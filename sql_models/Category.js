'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Category', {
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Category');
    }
};