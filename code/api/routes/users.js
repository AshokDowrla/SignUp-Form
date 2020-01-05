const express = require('express')

const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const config = require('config')
const jwt = require('jsonwebtoken')

//@route POST new User

router.post('/register', (req, res) => {


    const { name, password, email } = req.body
   //console.log(name)
    if (!name) {
        return res.status(400).json({ msg: 'User name can\'t be empty ' })
    }
    else if (!password) {
        return res.status(400).json({ msg: 'Password can\'t be empty ' })
    }
    else if (!email) {
        return res.status(400).json({ msg: 'Email can\'t be empty ' })
    }

    ///check existing email
     //console.log(email)
    User.find({ email:email })
        .then(user => {
            if (user.length) return res.status(400).json({ msg: 'a user is already registered with this Email' ,
       
        })


            const newUser = new User({
                name: name,
                password: password,
                email: email
            })


            ///create salt and hash

            bcrypt.genSalt(10, (err, salt) => {



                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            msg: 'Error: hashing error'
                        })
                    }

                    newUser.password = hash
                    newUser.save()
                        .then(result => {

                            jwt.sign(
                                {id:result.id},
                                config.get('jwtSecret'),
                                {expiresIn: 3600},

                                (err, token)=>{
                                    if(err) return res.status(400).json({msg:'error signing up'})
                                    res.status(200).json({
                                        token,
                                        user: {
                                            id: result.id,
                                            name: result.name,
                                            email: result.email
        
                                        }
                                    })
                                }
                            )
                         
                        })
                        .catch(err => {
                            res.status(500).json({
                                registerSuccess:false,
                                error: err
                            })
                        })

                })
            })


        })
})



module.exports = router