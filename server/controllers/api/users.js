const express = require('express');
const { User } = require('../../models');
const router = express.Router();
const UserManager = require('../../lib/managers/UserManager')

router.get('/', (req,res)=>{

})

router.post('/', async(req,res)=>{
    try{
        const user = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        return res.status(200).json(user);
    }catch(e){
        return res.status(500).json("That username is taken.")
    }
})

router.post('/login', async(req,res)=>{
    
    try{
        console.log('tried logging in')
        const user = await User.findOne({where:{username:req.body.username}});
        if (!user){
            return res.status(401).json({message:"Invalid Credentials."});
        }
        if (!user.isPasswordValid(req.body.password)){
            return res.status(401).json({message:"Invalid Credentials."});
        }
        req.session.activeUser = {
            username: req.body.username,
            id: user.id
        }
        return res.json({message:"logged in", id: user.id})
    }catch(e){
        console.log(e);
    }

})

router.get('/sockets', async(req,res)=>{
    return res.status(200).json(getAllUsers())
})

module.exports = router;