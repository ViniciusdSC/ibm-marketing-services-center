'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('../config/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const model = () => _sequelize2.default.define('user_categorie', {
  'user_categorie_id': {
    type: _sequelize3.DataTypes.INTEGER(20),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  'user_id': {
    type: _sequelize3.DataTypes.INTEGER(20),
    allowNull: false,
    references: {
      model: 'user',
      key: 'user_id'
    }
  },
  'categorie_id': {
    type: _sequelize3.DataTypes.INTEGER(20),
    allowNull: false,
    references: {
      model: 'categorie',
      key: 'categorie_id'
    }
  }
}, {
  timestamps: false,
  tableName: 'user_categorie'
});

exports.default = model;
//# sourceMappingURL=user_categorie.js.map