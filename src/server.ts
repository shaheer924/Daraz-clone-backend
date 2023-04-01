import App from './app'
import dotenv from 'dotenv'

dotenv.config({path: './config.env'})

const app = new App(process.env.PORT)

app.listen()