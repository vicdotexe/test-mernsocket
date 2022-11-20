const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class Chat extends Model {

}

Chat.init({
    // add properites here, ex:
    roomname: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    }
},{
    sequelize
});

module.exports=Chat