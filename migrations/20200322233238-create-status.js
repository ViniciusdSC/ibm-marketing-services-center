'use strict';
const xlsx = require('node-xlsx');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('status', {
      status_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(20)
      },
      name: {
        type: Sequelize.STRING
      }
    }).then(() => {
      // save status in database
      const data = xlsx.parse(`${__dirname}/data/status.xlsx`)[0].data;
      const records = data.map(status => {
        return {
          name: status[0]
        }
      });
      return queryInterface.bulkInsert('status', records);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('status');
  }
};
