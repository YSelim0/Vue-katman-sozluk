const { Model , DataTypes } = require('sequelize');

module.exports = (sequelize)=>{

    class Entrys extends Model {}

    Entrys.init({
        entryName:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        message:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        sender:{
            type:DataTypes.STRING,
            allowNull:false
        },
        date:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        sequelize,
        createdAt:false,
        updatedAt:false
    });

    return Entrys;
}