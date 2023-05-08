import App from './app'
import dotenv from 'dotenv'

dotenv.config({path: './config.env'})

const app = new App(process.env.PORT, process.env.MONGODB_URL)

app.listen()