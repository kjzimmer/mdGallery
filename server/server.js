import express from 'express'
import  cors from 'cors'
import dotenv from 'dotenv'
import { dbConnect } from './config/config.sequelize.js'
import { usersRouter } from './routes/user.routes.js'

const app = express()
app.use(express.json(), cors())

dotenv.config()

const PORT = process.env.SERVER_PORT || 8000

dbConnect()

 app.use('/api/users', usersRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})