const express = require('express');
const User = require('../model/UserModel')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.send("USer routes are working")
})

//sign-up
router.post('/register', async (req, res) => {

    try {
        const { name, email, password, address } = req.body;
        // console.log(name,email,password)
        const new_user = new User({ name, email, password, address });
        await new_user.save();
        res.status(201).send({ new_user, message: "User created successfully" })
    }
    catch (err) {
        res.status(400).send({ error: err.message })
        console.log(err.message)
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        console.log(user)
        if (!user) {
            throw new Error("Unable to login, Invalid credentials")
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error("Unable to login, Invalid credentials")
        }

        const token = jwt.sign({
            _id: user._id.toString(),
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

        res.send({ user,token });

    } catch (err) {
        res.status(400).send({ error: err })
    }
})



module.exports = router