const Sequelize = require('sequelize');

const sequelize = new Sequelize('nextdoor', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost',
});

// const sequelize = new Sequelize('d2qu01kjbd9km1', 'tdjedudbblrkkp', '3eb5d35f5c4911247887979f7fdc08ca18f5176e209f8d061b777b339e085f86', {
//   dialect: 'postgres',
//   host: 'ec2-34-236-215-156.compute-1.amazonaws.com',
// });

module.exports = sequelize;
