import { compare } from "bcrypt";
import { Request, Response } from "express";
import { IUserRepo } from "../repositories/IUserRepo"
import { Strategy } from '../helpers/Strategy';

export class LoginCotroller {
  constructor(private userRepo: IUserRepo) { }
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await this.userRepo.findUserByEmail(email)

    if (!user) {
      return res.status(400).send({
        message: 'email or password invalid.'
      })
    }

    if (email === process.env.EMAIL_ADMIN) {
      if (password !== process.env.PASSWORD_ADMIN)
        return res.status(400).send({
          message: 'email or password invalid.'
        })
      const token = await Strategy.generateToken({ id: user.id, role: user.role })
      return res.status(200).send({ token })
    }

    const passwordCompare = await compare(password.toString(), user.password)
    if (!passwordCompare) {
      return res.status(400).send({
        message: 'email or password invalid.'
      })
    }
    const token = await Strategy.generateToken({id: user.id, role: user.role})
    return res.status(200).send({ token })
  }
}
