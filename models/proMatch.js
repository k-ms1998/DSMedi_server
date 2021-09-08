const { sequelize } = require(".");

//proMatch = Product Match(Matching each product name from each mall w/ the erp code)
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('promatch', {
        mall: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        mall_id:{
            type: DataTypes.STRING(30),
            primaryKey: true
        }
    },{
        timestamps: false
    })
}