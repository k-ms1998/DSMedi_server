const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('saledata', {
        mall:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        order_id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        storeName:{
            type: DataTypes.STRING
        },
        store_id:{
            type: DataTypes.STRING
        },
        productName:{
            type: DataTypes.STRING
        }
    },{
        timestamps: false
    })
}