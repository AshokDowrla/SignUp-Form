const express = require('express')

const router = express.Router()


const auth = require('../../middleware/auth')


const User = require('../models/user')


router.get('/list', auth, (req,res)=>{
    User.find()
    .select('-password')
    .then(list=>{
        res.status(200).json({
            count:list.length,
            users:list
        })
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    })
})




module.exports = router;