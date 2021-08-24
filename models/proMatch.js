const { sequelize } = require(".");

//proMatch = Product Match(Matching each product name from each mall w/ the erp code)
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('promatch', {
        mall: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        erp_code:{
            type: DataTypes.STRING,
            allowNull: false
        },
        mall_name:{
            type: DataTypes.STRING,
            primaryKey: true
        }
    },{
        timestamps: false
    })
}