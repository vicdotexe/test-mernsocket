const sequelize = require("../config/connection");
const {User, Message, Chat} = require('../models')
const seed = async()=>{
    await sequelize.sync({force:true})
    await User.bulkCreate([
        {
            username: 'Guest',
            password: 'password'
        },
        {
            username: 'Victor',
            password: 'password'
        }
    ], {
        individualHooks: true
    })
    console.log("seeded!");
    process.exit(0);
}

seed();