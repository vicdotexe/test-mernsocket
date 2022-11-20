const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {

}

Message.init({
    // add properites here, ex:
    content: {
         type: DataTypes.TEXT,
         allowNull:false
    }
},{
    sequelize,
    updatedAt: false
});

module.exports=Message