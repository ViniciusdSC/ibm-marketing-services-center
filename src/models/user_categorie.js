import sequelize from '~/config/sequelize';
import { DataTypes } from 'sequelize';

const model = () => sequelize.define('user_categorie', {
  'user_categorie_id': {
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
  'categorie_id': {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    references: {
      model: 'categorie',
      key: 'categorie_id'
    }
  },
});

export default model;
