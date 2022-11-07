const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/jobsRoutes')
const userRoutes = require('./routes/userRoutes')
const jobsRoutes = require('./routes/jobsRoutes')
dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('database ok')
})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/jobs', jobsRoutes)
app.use('/users', userRoutes)

app.get('/', (req,res) => {
    res.send('SERVER OK')
})

app.listen(process.env.PORT, () => {
    console.log(`app running in http://localhost:${process.env.PORT}`)
})