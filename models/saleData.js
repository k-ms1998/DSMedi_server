const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('saledata', {
        mall:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        orderId:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        storeName:{
            type: DataTypes.STRING
        },
        storeId:{
            type: DataTypes.STRING
        },
        productName:{
            type: DataTypes.STRING
        },
        productId:{
            type: DataTypes.STRING
        }
    },{
        timestamps: false
    })
}