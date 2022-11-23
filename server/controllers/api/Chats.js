const express = require('express');
const { Chat, Message, User } = require('../../models');
const router = express.Router();

router.get('/lobby', async(req,res)=>{
    try{
        const lobby = await Chat.findOrCreate({
            where:{
                roomname:"lobby"
            },
            include:{
                model:Message,
                include:User
            }
        });
    
        const messages = lobby[0].Messages.map(message => {
            return {
                content:message.get({plain:true}).content,
                username:message.User.username
            }
        });
        return res.status(200).json(messages);
    }catch(e){
        return res.status(500).json(e.message);
    }
})

module.exports = router;