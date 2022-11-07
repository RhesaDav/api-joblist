const { Router } = require('express')
const express = require('express')
const { getJobList, getJobDetail, search } = require('../controller/jobsController.js')
const authenticateJWT = require('../middleware/auth.js')
const jobsRoutes = express.Router()

jobsRoutes.get('/test', (req,res) => {
    res.send('Job jobsRoutes')
})
jobsRoutes.get('/',authenticateJWT, getJobList)
jobsRoutes.get('/:id', authenticateJWT, getJobDetail)

module.exports = jobsRoutes