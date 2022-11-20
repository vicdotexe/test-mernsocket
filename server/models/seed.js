const sequelize = require("../config/connection");
const {User, Message, Chat} = require('../models')
const seed = async()=>{
    await sequelize.sync({force:true})
    console.log("seeded!");
    process.exit(0);
}

seed();