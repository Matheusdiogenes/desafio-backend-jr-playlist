import { PrismaClient } from '@prisma/client'
import { IUserRepo } from "../repositories/IUserRepo"
import { hash } from 'bcrypt'
import { User } from '../entities/User'

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
    if(user.password) user.password = await hash(user.password.toString(), 10)
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
    const user = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: await hash(userData.password.toString(), 10)
      }
    })
    return user
  }

}

