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

//db.bgs = require('./bgs')(sequelize, Sequelize);  //Deprecated
db.stdProducts = require('./stdProducts')(sequelize, Sequelize);
db.proMatch = require('./proMatch')(sequelize, Sequelize);
db.saleData = require('./saleData')(sequelize, Sequelize);

db.proMatch.belongsTo(db.stdProducts, {
    targetKey: 'id',
    foreignKey: 'erp_id'
});
db.saleData.belongsTo(db.proMatch, {
    targetKey: 'mall_id',
    foreignKey: 'product_id'
});
db.stdProducts.hasOne(db.proMatch, {
    as: 'sp',
    foreignKey: 'erp_id',
    sourceKey: 'id'
});
db.proMatch.hasOne(db.saleData, {
    as: 'pm',
    foreignKey: 'product_id',
    sourceKey: 'mall_id' 
});
/*
db.proMatch.hasOne(db.stdProducts, {
    foreignKey: 'erp_id_test',
    targetKey: 'id'
})
db.saleData.belongsTo(db.proMatch, {
    foreignKey: 'productId',
    targetKey: 'mall_id'
})
*/

module.exports = db