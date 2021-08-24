const { sequelize } = require(".");

//bgs = Blood Glucose Strips(혈당측정지)
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('bgs', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        sn:{
            type: DataTypes.STRING
        }
    },{
        timestamps: false
    })
}