// Tipos para os produtos da Amazon
export interface AmazonProduct {
  title: string
  rating?: number
  reviewsCount?: number
  imageUrl?: string
  productUrl?: string
  price?: string
}

// Resposta da API de scraping
export interface ScrapeResponse {
  success: boolean
  keyword: string
  productsCount: number
  products: AmazonProduct[]
  timestamp: string
}

// Resposta de erro
export interface ErrorResponse {
  success: false
  error: string
  message: string
  timestamp: string
}

// Query parameters para a rota de scraping
export interface ScrapeQuery {
  keyword: string
  limit?: string
}
