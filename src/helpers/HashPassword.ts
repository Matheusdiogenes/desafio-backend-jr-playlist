import { hash } from 'bcrypt'
export class HashPassword {
  static async hash(password: string) {
    const passwordHash = await hash(password, 10)
    return passwordHash
  }
}