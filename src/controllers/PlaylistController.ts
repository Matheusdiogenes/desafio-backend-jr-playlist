import { Request, Response } from "express";
import { IPlaylistRepo } from "../repositories/IPlaylistRepo";

export class PlaylistController {
  constructor(private playlistRepo: IPlaylistRepo) { }

  create = async (req: Request, res: Response) => {
    const playlist = await this.playlistRepo.savePlaylist(req.body)
    res.json({ ...playlist })
  }

  findAll = async (req: Request, res: Response) => {
    const idUser = parseInt(req.params.idUser)
    const playlist = await this.playlistRepo.findAllPlaylist(idUser)
    res.json({ ...playlist })
  }

  delete = async (req: Request, res: Response) => {
    const idUser = parseInt(req.params.idUser)
    const idPlaylist = parseInt(req.params.idPlaylist)
    const isDelete = await this.playlistRepo.deletePlaylist(idUser, idPlaylist)
    res.json(isDelete)
  }

  update = async (req: Request, res: Response) => {
    const idUser = parseInt(req.params.idUser)
    const idPlaylist = parseInt(req.params.idPlaylist)
    const updated = await this.playlistRepo.updatePlaylist(idUser, idPlaylist, req.body)
    res.json(updated)
  }
}
