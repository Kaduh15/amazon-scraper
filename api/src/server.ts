import express from 'express'
import cors from 'cors'
import 'express-async-errors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    message: 'Amazon Scraper API está funcionando!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      scrape: '/api/scrape?keyword=produto'
    }
  })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro capturado:', error)
  
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado'
  })
})

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📍 Acesse: http://localhost:${PORT}`)
  console.log(`🔍 Health check: http://localhost:${PORT}/health`)
})

export default app
