import { Request, Response } from 'express';
import SongsService from './songs-service';
import { CreateSongDto } from './dtos/CreateSongDto';
import { s3 } from '../../middlewares/s3-middleware'

class SongsController {
  private songsService: SongsService;

  constructor(songsService: SongsService) {
    this.songsService = songsService;
  }

  createSong = async (req: Request, res: Response): Promise<void> => {
    try {
      const createSongDto: CreateSongDto = req.body;
      const userId = (req as any).user.id;
      const s3Data = req.body.s3Data;

      const song = await this.songsService.createSong(createSongDto, userId, s3Data);
      res.status(201).json(song);
    } catch (err) {
      res.status(500).json({ message: 'Error creating song' });
    }
  };

  getAllSongs = async (req: Request, res: Response): Promise<void> => {
    try {
      const songs = await this.songsService.getAllSongs();
      res.status(200).json(songs);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching songs' });
    }
  };

  getUserSongs = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const songs = await this.songsService.getUserSongs(userId);
      res.status(200).json(songs);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user songs' });
    }
  };

  getSongById = async (req: Request, res: Response): Promise<void> => {
    try {
      const songId = req.params.id;
      const song = await this.songsService.getSongById(songId);

      if (!song) {
        res.status(404).json({ message: 'Song not found' });
        return;
      }

      res.status(200).json(song);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching song' });
    }
  };

  deleteSong = async (req: Request, res: Response): Promise<void> => {
    try {
      const songId = req.params.id;
      await this.songsService.deleteSong(songId);

      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: 'Error deleting song' });
    }
  };

  streamSongById = async (req: Request, res: Response): Promise<void> => {
    try {
      const songId = req.params.id;
      const song = await this.songsService.getSongById(songId);

      if (!song) {
        res.status(404).json({ message: 'Song not found' });
        return;
      }

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: song.key,
      };

      const stream = s3.getObject(params).createReadStream();
      res.setHeader('Content-Type', song.url.split('.').pop() || 'audio/mpeg');
      stream.pipe(res);
    } catch (err) {
      res.status(500).json({ message: 'Error streaming song' });
    }
  };
}

export default SongsController;
