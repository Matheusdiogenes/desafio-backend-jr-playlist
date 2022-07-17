import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
  USER = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.headers.authorization

    if (!credentials) {
      return res.status(401).send({ message: "No token provided." })
    }

    const [typeToken, token] = credentials.split(' ')

    if (!token) return res.status(401).send({ message: "No token provided." })        

    const secretKey = process.env.SECRETKEY

    jwt.verify(token, secretKey!, (err, decoded: any) => {
      if (err) return res.status(400).send({ message: err.message })
      
      const isUser = decoded.role.toUpperCase() === 'USER'    
      
      if(!isUser) return res.status(403).json({ message: 'Não autorizado.' })
      // req.decoded = decoded
      return next()
    })
  }

  ADMIN = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.headers.authorization

    if (!credentials) {
      return res.status(401).send({ message: "No token provided." })
    }

    const [typeToken, token] = credentials.split(' ')

    if (!token) return res.status(401).send({ message: "No token provided." })        

    const secretKey = process.env.SECRETKEY

    jwt.verify(token, secretKey!, (err, decoded: any) => {
      if (err) return res.status(400).send({ message: err.message })      
      if(decoded.role.toUpperCase() !== 'ADMIN') return res.status(403).json({ message: 'Não autorizado.' })
      // req.idUser = decoded.id
      return next()
    })
  } 
}