import { PrismaClient } from "@prisma/client";
import { Playlist } from "../entities/Playlist";
import { IPlaylistRepo } from "../repositories/IPlaylistRepo";

export class PlaylistService implements IPlaylistRepo {
  private prisma = new PrismaClient()
  
  async updatePlaylist(idUser: number, idPlaylist: number, playlistData: Playlist): Promise<boolean> {
    const findPlaylist = await this.prisma.playlist.findUnique({
      where: {
        id: idPlaylist        
      }
    })    
    if(!findPlaylist || findPlaylist.authorId !== idUser) throw new Error("Acesso negado.");

    await this.prisma.playlist.update({
      where: {
        id: idPlaylist
      },
      data: {
        ...playlistData
      }
    })
    return true
  }

  async deletePlaylist(idUser: number, idPlaylist: number): Promise<boolean> {
    const playlist = await this.prisma.playlist.findUnique({
      where: {
        id: idPlaylist        
      }
    })    
    if(!playlist || playlist.authorId !== idUser) throw new Error("Acesso negado.");

    await this.prisma.playlist.delete({
      where: {
        id: idPlaylist
      }
    })
    return true
  }

  async findAllPlaylist(idUser: number): Promise<Playlist[]> {
    const playlists = await this.prisma.playlist.findMany({
      where: {
        authorId: idUser
      }
    })
    return playlists
  }
  async savePlaylist(playlist: Playlist): Promise<Playlist> {
    const playlistSave = await this.prisma.playlist.create({
      data: {
        ...playlist
      }
    })
    return playlistSave
  }
}