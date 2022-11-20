const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {
    isPasswordValid(password){
        return bcrypt.compareSync(password, this.password);
    }
}

User.init({
    // add properites here, ex:
    username: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
   }
},{
    hooks :{
        beforeCreate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,8);
            return userObj
        }
    },
    sequelize,
    updatedAt: false,
    createdAt: false
});

module.exports=User