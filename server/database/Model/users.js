const { Model , DataTypes } = require('sequelize');

module.exports = (sequelize)=>{

    class Users extends Model{}

    Users.init({
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        discordName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        authToken:{
            type:DataTypes.STRING,
            allowNull:false
        },
        userType:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        sequelize,
        createdAt:false,
        updatedAt:false
    });

    return Users;

}