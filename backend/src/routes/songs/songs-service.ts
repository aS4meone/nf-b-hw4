import { CreateSongDto } from './dtos/CreateSongDto'
import Song, { ISong } from './models/Song'

class SongsService {
  async createSong(createSongDto: CreateSongDto, userId: string, s3Data: any): Promise<ISong> {
    const newSong = new Song({
      ...createSongDto,
      user: userId,
      key: s3Data.Key,
      url: s3Data.Location
    })

    await newSong.save()
    return newSong
  }

  async getAllSongs(): Promise<ISong[]> {
    return await Song.find()
  }

  async getUserSongs(userId: string): Promise<ISong[]> {
    return await Song.find({ user: userId })
  }

  async getSongById(songId: string): Promise<ISong | null> {
    return await Song.findById(songId)
  }

  async deleteSong(songId: string): Promise<void> {
    await Song.findByIdAndDelete(songId)
  }
}

export default SongsService
