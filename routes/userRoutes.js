const { Router } = require('express')
const express = require('express')
const { getAllUsers, registerUser, loginUser } = require('../controller/userControlelr')
const authenticateJWT = require('../middleware/auth')
const userRoutes = express.Router()

userRoutes.get('/test', (req,res) => {
    res.send('Job userRoutes')
})
userRoutes.get('/', getAllUsers)
userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)

module.exports = userRoutes