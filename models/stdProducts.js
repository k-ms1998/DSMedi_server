const { sequelize } = require(".");

//stdProcuts = table of the standardized names and product ID for all products(ERP 기준)
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stdProducts', {
        id: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        sn:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        timestamps: false
    })
}