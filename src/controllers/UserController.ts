import { Request, Response } from "express";
import { IUserRepo } from "../repositories/IUserRepo";

export class UserController {
  constructor(private userRepo: IUserRepo) { }
  create = async (req: Request, res: Response) => {
    const user = await this.userRepo.saveUser(req.body)
    res.status(200).json({ ...user })
  }

  findAll = async (req: Request, res: Response) => {
    const user = await this.userRepo.findAllUser()
    res.status(200).json({ ...user })
  }

  update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const update = await this.userRepo.updateUser(id, req.body)
    res.status(200).json(update)
  }

  delete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const update = await this.userRepo.deleteUser(id)
    res.status(200).json(update)
  }



}