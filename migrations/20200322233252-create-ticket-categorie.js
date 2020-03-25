'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ticket_categorie', {
      ticket_categorie_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(20)
      },
      ticket_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        references: {
          model: 'ticket',
          key: 'ticket_id'
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
    return queryInterface.dropTable('ticket_categorie');
  }
};
