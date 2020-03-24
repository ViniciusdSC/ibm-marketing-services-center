import sequelize from '~/config/sequelize';
import { DataTypes } from 'sequelize';

const model = () => sequelize.define('ticket', {
  'id': {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  'user_id': {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    references: {
      model: Users,
      key: 'user_id'
    }
  },
  'status_id': {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    references: {
      model: Status,
      key: 'user_id'
    }
  },
  'description': {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default model;
