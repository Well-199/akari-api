require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }));

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    server.use(cors())
    next()
})

server.use(function (req, res, next) {
    console.log(req.body) // se aparecer aqui chegou na api mas ainda nao executou no banco
    next()
})

server.use('/api', routes)

server.listen(process.env.PORT, () => {
    console.log(`Servidor em http://localhost${process.env.PORT}`)
})


