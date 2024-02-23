const express = require('express');
const { dbConnection } = require('../db/config');

class Server{
    
    constructor(){
        this.app = express ();
        this.port = process.env.PORT;
        this.cursosPatch = '/api/curso';
        this.almunosPatch = '/api/alumno';
<<<<<<< HEAD
        this.profesoresPatch = '/api/profesor';
=======
        this.authPath = '/api/auth';
>>>>>>> feuture/alumnos

        this.conectarDB();
        this.middlewares();
        this.routescursos();
        this.routesalumnos();
<<<<<<< HEAD
        this.routesprofesores();
=======
        this.routesauth();
>>>>>>> feuture/alumnos
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

    routesalumnos(){
        this.app.use(this.almunosPatch, require('../routes/alumno.routes'));
    }

<<<<<<< HEAD
    routesprofesores(){
        this.app.use(this.profesoresPatch, require('../routes/profesor.router'));
=======
    routesauth(){
        this.app.use(this.authPath, require('../routes/auth.routers'));
>>>>>>> feuture/alumnos
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor ejecutado y esuchando en el puerto',this.port);
        });
    }

}

module.exports = Server;
