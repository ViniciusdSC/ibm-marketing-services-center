import sequelize from '~/config/sequelize';
import { DataTypes } from 'sequelize';
import status from './status'

const model = () => {
  const ticket = sequelize.define('ticket', {
    'ticket_id': {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    'user_id': {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    'status_id': {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      references: {
        model: status,
        key: 'status_id'
      }
    },
    'description': {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'ticket'
  });

  ticket.belongsTo(status(), { as: 'status', foreignKey: 'status_id' });

  return ticket;
};

export default model;
