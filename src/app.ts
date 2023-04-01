import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import router from "./router/router";
import mongoose from "mongoose";
import ErrorHandler from "./middleware/ErrorHandler";

class App {
    public app: any;
    port: any
    constructor(port: any) {
        this.app = express()
        this.port = port

        this.initializeMiddleware()
        this.initializeRoute()
        this.initializeDatabase()
        this.initializeErrorHandler()
    }

    private initializeMiddleware(){
        this.app.use(express.json())
        this.app.use(cors({
            origin: '*'
        }))
        this.app.use(morgan('dev'))
    }

    private initializeRoute() {
        this.app.use(router)
    }

    private initializeDatabase() {
        mongoose.connect('mongodb://0.0.0.0:27017/ecommerce-webapp').then(resp => {
            console.log('Database is connected successfully')
        }).catch(err=>{
            console.log(err)
        })
    }

    private initializeErrorHandler () {
        this.app.use(ErrorHandler)
    }
    public listen() {
        this.app.listen(this.port, ()=>{
            console.log(`Server is listening on PORT ${this.port}`)
        })
    }
}

export default App