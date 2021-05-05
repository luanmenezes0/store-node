import bodyParser from 'body-parser';
import express from 'express';
import { MongoClient } from 'mongodb';

import { get404 } from './controllers/error.js';
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';
import { sequelize } from './util/database.js';
import Product from './models/product.js';
import User from './models/user.js';
import Cart from './models/cart.js';
import CartItem from './models/cartItem.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });

async function init() {
  try {
    await sequelize.sync();

    let user = await User.findByPk(1);

    if (!user) {
      user = await User.create({ email: 'luan@luan.com', name: 'luan' });
      await user.createCart();
    }

    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
}

init().catch(err => console.error(err));
