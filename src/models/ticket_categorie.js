import sequelize from '~/config/sequelize';
import { DataTypes } from 'sequelize';

const model = () => sequelize.define('ticket_categorie', {
  'ticket_categorie_id': {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  'ticket_id': {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    references: {
      model: 'ticket',
      key: 'ticket_id'
    }
  },
  'categorie_id': {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    references: {
      model: 'categorie',
      key: 'categorie_id'
    }
  },
}, {
  timestamps: false,
  tableName: 'ticket_categorie'
});

export default model;
