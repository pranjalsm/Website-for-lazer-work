import express from 'express'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'laser-head-service-kolhapur' })
})

app.listen(port, () => {
  console.log(`Optional API starter listening on port ${port}`)
})
