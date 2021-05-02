import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://postgres@localhost:5432/nodestore');

(async function init() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
