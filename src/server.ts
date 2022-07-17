import 'dotenv/config' 
import express from 'express'
import { resolve } from 'path'
import swaggerUi from 'swagger-ui-express'
import { router } from './routes'

import swaggerDocs from './swagger.json'

const app = express()

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup((swaggerDocs)))

app.get('/', (req, res) => {
  res.send({ api: 'api with prisma' })
})

app.use(router)

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
  console.log(`run...`)
})
