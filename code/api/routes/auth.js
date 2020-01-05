const express = require('express')

const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

//@route Auth User

router.post('/login', (req, res) => {


    const { password, email } = req.body

    if (!password) {
        return res.status(400).json({ msg: 'Password can\'t be empty ' })
    }
    else if (!email) {
        return res.status(400).json({ msg: 'Email can\'t be empty ' })
    }

    ///check existing email
    //console.log(email)
    User.find({ email: email })
        .then(users => {


            if (!users.length) return res.status(400).json({
                msg: 'This email is not registered with us. Please sign up ',

            })


            const user = users[0]

            ///validate password

            bcrypt.compare(password, user.password)
                .then(isMatch => {

                    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },

                        (err, token) => {
                            if (err) return res.status(400).json({ msg: 'error signing in' })
                            res.status(200).json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email

                                }
                            })
                        }
                    )
                })

                .catch(err => {
                    res.status(500).json({
                        authSuccess: false,
                        error: err,

                    })
                })


        })
})



///get user details

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>{
            res.status(400).json({
                error:err
            })
        })
})

module.exports = router