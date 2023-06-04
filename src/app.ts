import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import router from "./router/router";
import mongoose from "mongoose";
import ErrorHandler from "./middleware/ErrorHandler";
import {
    scrapeDummyStoreData,
    scrapeFakeStoreApi,
    scrapeStoreRestApi,
    StoreDataInDB
} from "./utils/scrape-data/controller";


import cron from 'node-cron'
import FetchProduct from "./utils/scrape-data/Models/FetchProduct";

class App {
    public app: any;
    port: any
    mongodb_url: string
    constructor(port: any, mongodb_url: any) {
        this.app = express()
        this.port = port
        this.mongodb_url = mongodb_url

        this.initializeMiddleware()
        this.initializeRoute()
        this.initializeDatabase()
        this.initializeErrorHandler()
        this.initializeCronJob().then(async (r) => StoreDataInDB())
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
        mongoose.connect(this.mongodb_url).then(resp => {
            console.log('Database is connected successfully')
        }).catch(err=>{
            console.log(err)
        })
    }

    async initializeCronJob () {
        let products = await FetchProduct.find()
        if(products.length<1) {
            scrapeDummyStoreData().then(r => {
                console.log("Data scrape successfully ---> DummyJSON")
            })
            scrapeFakeStoreApi().then(r=> {
                console.log("Data scrape successfully ---> FakeStore")
            })
            scrapeStoreRestApi().then(r=> console.log("Data scrape successfully ---> StoreRestApi"))
        }
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