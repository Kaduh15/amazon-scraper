import type { Response } from 'express'
import type { ErrorResponse } from '../types/index.js'

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    
    Error.captureStackTrace(this, this.constructor)
  }
}

export const sendErrorResponse = (
  res: Response, 
  error: string, 
  message: string, 
  statusCode: number = 500
): void => {
  const response: ErrorResponse = {
    success: false,
    error,
    message,
    timestamp: new Date().toISOString()
  }
  
  res.status(statusCode).json(response)
}

export const handleAsyncError = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
