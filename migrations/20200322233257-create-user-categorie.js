'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_categorie', {
      user_categorie_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(20)
      },
      user_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id'
        }
      },
      categorie_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        references: {
          model: 'categorie',
          key: 'categorie_id'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_categorie');
  }
};
