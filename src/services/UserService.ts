import { PrismaClient } from '@prisma/client'
import { IUserRepo } from "../repositories/IUserRepo"
import { User } from '../entities/User'
import { HashPassword } from '../helpers/HashPassword'

export class UserService implements IUserRepo {
  private prisma = new PrismaClient()
  
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  }

  async deleteUser(idUser: number): Promise<boolean> {
    await this.prisma.user.delete({
      where: {
        id: idUser
      }
    })
    return true
  }

  async updateUser(idUser: number, user: User): Promise<boolean> {
    const hash = await HashPassword.hash(user.password)
    if(user.password) user.password = hash
    await this.prisma.user.update({
      where: {
        id: idUser
      },
      data: {
        ...user
      }
    })
    return true
  }

  async findAllUser(): Promise<User[]> {
    const user = await this.prisma.user.findMany()
    return user
  }

  async saveUser(userData: any): Promise<User> {
    const hash = await HashPassword.hash(userData.password)
    const user = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hash
      }
    })
    return user
  }

}

