'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('../config/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('sequelize');

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const model = () => {
  const ticket = _sequelize2.default.define('ticket', {
    'ticket_id': {
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
    'status_id': {
      type: _sequelize3.DataTypes.INTEGER(20),
      allowNull: false,
      references: {
        model: _status2.default,
        key: 'status_id'
      }
    },
    'description': {
      type: _sequelize3.DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'ticket'
  });

  ticket.belongsTo((0, _status2.default)(), { as: 'status', foreignKey: 'status_id' });

  return ticket;
};

exports.default = model;
//# sourceMappingURL=ticket.js.map