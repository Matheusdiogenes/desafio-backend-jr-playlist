import jwt from 'jsonwebtoken'

export class Strategy {
  static decodedToken(authorization: string) {
    const [typeToken, token] = authorization.split(' ')
    const decoded: any = jwt.decode(token)
    return decoded
  }

  static generateToken(payload: any) {
    const token = jwt.sign({ userID: payload.id, role: payload.role }, process.env.SECRETKEY!, { expiresIn: '2h' })
    return token
  }

  static verifyToken(token: string, role: string): boolean {
    const secretKey = process.env.SECRETKEY
    const decoded: any = jwt.verify(token, secretKey!)
    const isUser = decoded.role.toUpperCase() === role
    if(!isUser) return false
    return true
  }
}