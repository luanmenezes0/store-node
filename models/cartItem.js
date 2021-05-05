import Sequelize from 'sequelize';

import { sequelize } from '../util/database.js';

const CartItem = sequelize.define('cartitem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

export default CartItem;
