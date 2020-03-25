'use strict';
const xlsx = require('node-xlsx');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categorie', {
      categorie_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(20)
      },
      name: {
        type: Sequelize.STRING
      }
    }).then(() => {
      // save categories in database
      const data = xlsx.parse(`${__dirname}/data/categories-hierarchy.xlsx`)[0].data;
      data.splice(0, 1);
      const records = data.map(categories => {
        return {
          name: categories.join('/')
        };
      });

      return queryInterface.bulkInsert('categorie', records);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categorie');
  }
};
