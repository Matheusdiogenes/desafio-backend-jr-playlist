import { Playlist } from "../entities/Playlist";

export interface IPlaylistRepo {
  savePlaylist(playlist: Playlist): Promise<Playlist>
  findAllPlaylist(idUser: number): Promise<Playlist[]>
  deletePlaylist(idUser: number, idPlaylist: number): Promise<boolean>
  updatePlaylist(idUser: number, idPlaylist: number, playlist: Playlist): Promise<boolean>
}