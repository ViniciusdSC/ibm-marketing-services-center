import sequelize from '~/config/sequelize';
import { DataTypes } from 'sequelize';

const model = () => sequelize.define('categorie', {
  'categorie_id': {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  'name': {
    type: DataTypes.STRING(100),
    allowNull: false
  }
});

export default model;
