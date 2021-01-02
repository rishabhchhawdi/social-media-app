const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
const { token_jwt } = require("../key")






router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email already registered" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name
                        
                    })

                    user.save()
                        .then(user => {
                            // transporter.sendMail({
                            //     to:user.email,
                            //     from:"no-reply@insta.com",
                            //     subject:"signup success",
                            //     html:"<h1>welcome to instagram</h1>"
                            // })
                            res.json({ message: "Data Saved" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Please add Email or Password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or Password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        
                        const token = jwt.sign({ _id: savedUser._id }, token_jwt)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email} })

                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or Password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router