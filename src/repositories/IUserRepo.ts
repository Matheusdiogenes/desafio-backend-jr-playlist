import { User } from "../entities/User";

export interface IUserRepo {
  saveUser(user: any) : Promise<User>
  findAllUser() : Promise<User[]>
  findUserByEmail(email: string) : Promise<User | null>
  updateUser(idUser: number, user: User) : Promise<boolean>
  deleteUser(idUser: number) : Promise<boolean>  
}