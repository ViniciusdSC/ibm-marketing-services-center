'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ticket', {
      ticket_id: {
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
      status_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        references: {
          model: 'status',
          key: 'status_id'
        }
      },
      description: {
        type: Sequelize.STRING
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ticket');
  }
};
