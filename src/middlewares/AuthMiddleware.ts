import { Request, Response, NextFunction } from "express";
import { Strategy } from '../helpers/Strategy';

export class AuthMiddleware {
  USER = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.headers.authorization
    if (!credentials) return res.status(401).send({ message: "No token provided." })
    
    const [typeToken, token] = credentials.split(' ')
    if (!token) return res.status(401).send({ message: "No token provided." })
    const isUser = Strategy.verifyToken(token, 'USER')
    if (!isUser) return res.status(403).json({ message: 'Não autorizado.' })
    next()
  }

  ADMIN = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.headers.authorization

    if (!credentials) return res.status(401).send({ message: "No token provided." })   

    const [typeToken, token] = credentials.split(' ')
    if (!token) return res.status(401).send({ message: "No token provided." })
    const isAdmin = Strategy.verifyToken(token, 'ADMIN')
    if (!isAdmin) return res.status(403).json({ message: 'Não autorizado.' })
    next()
    
  }
}