const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];

var db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)
try{
    sequelize.authenticate();
    console.log("Connection Successful")
}catch(err){
    console.log(err)
}
db.sequelize = sequelize
db.Sequelize = Sequelize

db.bgs = require('./bgs')(sequelize, Sequelize);
db.saleData = require('./saleData')(sequelize, Sequelize);
db.proMatch = require('./proMatch')(sequelize, Sequelize);

module.exports = db