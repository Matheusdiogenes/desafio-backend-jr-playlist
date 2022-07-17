import 'dotenv/config' 
import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send({ api: 'api with prisma' })
})

app.use(router)

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
  console.log(`run...`)
})
