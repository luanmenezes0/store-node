import bodyParser from 'body-parser';
import express from 'express';

import { get404 } from './controllers/error.js';
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';

import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:luan9999@localhost:5432/nodestore');

(async function init() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(3000);
