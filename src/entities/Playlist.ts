interface PlaylistProps {
  authorId: number
  name: string
  genre: string
  musics: string[]
}

export class Playlist {
  authorId: number
  name: string
  genre: string
  musics: string[]
  constructor({ name, genre, musics, authorId }: PlaylistProps) {
    this.name = name
    this.genre = genre
    this.musics = musics
    this.authorId = authorId
  }
}