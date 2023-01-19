const { Sequelize } = require('sequelize');
let storage;
if (process.env.NODE_ENV === 'test') {
  storage = 'src/models/database-test.sqlite';
} else {
  storage = 'src/models/database.sqlite';
}
exports.sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/models/database.sqlite',
});
console.log('outside-storage:', storage);
