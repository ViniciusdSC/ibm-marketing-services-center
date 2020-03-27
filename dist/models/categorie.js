'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('../config/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const model = () => _sequelize2.default.define('categorie', {
  'categorie_id': {
    type: _sequelize3.DataTypes.INTEGER(20),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  'name': {
    type: _sequelize3.DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'categorie'
});

exports.default = model;
//# sourceMappingURL=categorie.js.map