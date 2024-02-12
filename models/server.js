const express = require('express');
const { dbConnection } = require('../db/config');

class Server{
    
    constructor(){
        this.app = express ();
        this.port = process.env.PORT;
        this.cursosPatch = '/api/curso';

        this.conectarDB();
        this.middlewares();
        this.routescursos();
    }

    async conectarDB (){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.json());
    }

    routescursos(){
        this.app.use(this.cursosPatch, require ('../routes/curso.routes'));
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor ejecutado y esuchando en el puerto',this.port);
        });
    }

}

module.exports = Server;
