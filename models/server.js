const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.projectsPath = '/api/projects'
        
        this.conectarDB()
        this.middlewares()
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Log
        this.app.use(morgan('combined'))

        // Lectura y parseo de JSON
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.projectsPath, require('../routes/projects'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto', this.port);
        })
    }
    
}

module.exports = Server