import { Request, Response } from "express";
import { IUserRepo } from "../repositories/IUserRepo";

export class UserController {
  constructor(private userRepo: IUserRepo) { }
  create = async (req: Request, res: Response) => {
    const user = await this.userRepo.saveUser(req.body)
    res.json({ ...user })
  }

  findAll = async (req: Request, res: Response) => {
    const user = await this.userRepo.findAllUser()
    res.json({ ...user })
  }

  update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const update = await this.userRepo.updateUser(id, req.body)
    res.json(update)
  }

  delete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const update = await this.userRepo.deleteUser(id)
    res.json(update)
  }



}