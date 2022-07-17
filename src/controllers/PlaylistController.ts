import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import { IPlaylistRepo } from "../repositories/IPlaylistRepo";

export class PlaylistController {
  constructor(private playlistRepo: IPlaylistRepo) { }

  create = async (req: Request, res: Response) => {
    const credentials = req.headers.authorization
    const [typeToken, token] = credentials!.split(' ')
    const decoded: any = jwt.decode(token)    
    const playlist = await this.playlistRepo.savePlaylist({
      authorId: decoded!.userID,
      genre: req.body.genre,
      name: req.body.name,
      musics: req.body.musics,
    })
    res.json({ ...playlist })
  }

  findAll = async (req: Request, res: Response) => {
    const credentials = req.headers.authorization
    const [typeToken, token] = credentials!.split(' ')
    const decoded: any = jwt.decode(token)
    const idUser = decoded!.userID
    const playlist = await this.playlistRepo.findAllPlaylist(idUser)
    res.json({ ...playlist })
  }

  delete = async (req: Request, res: Response) => {
    const credentials = req.headers.authorization
    const [typeToken, token] = credentials!.split(' ')
    const decoded: any = jwt.decode(token)
    const idUser = decoded!.userID
    const idPlaylist = parseInt(req.params.idPlaylist)
    const isDelete = await this.playlistRepo.deletePlaylist(idUser, idPlaylist)
    res.json(isDelete)
  }

  update = async (req: Request, res: Response) => {
    const credentials = req.headers.authorization
    const [typeToken, token] = credentials!.split(' ')
    const decoded: any = jwt.decode(token)
    const idUser = decoded!.userID
    const idPlaylist = parseInt(req.params.idPlaylist)
    const updated = await this.playlistRepo.updatePlaylist(idUser, idPlaylist, req.body)
    res.json(updated)
  }
}
