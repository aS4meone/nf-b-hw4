import { Router } from 'express';
import multer from 'multer';
import SongsController from './songs-controller';
import SongsService from './songs-service';
import { authMiddleware } from '../../middlewares/auth-middleware'
import { uploadToS3 } from '../../middlewares/s3-middleware'

const upload = multer();

const songsRouter = Router();
const songsService = new SongsService();
const songsController = new SongsController(songsService);

songsRouter.post('/songs', authMiddleware, upload.single('file'), uploadToS3, songsController.createSong);
songsRouter.get('/songs', songsController.getAllSongs);
songsRouter.get('/songs/user', authMiddleware, songsController.getUserSongs);
songsRouter.get('/songs/:id', songsController.getSongById);
songsRouter.delete('/songs/:id', authMiddleware, songsController.deleteSong);

songsRouter.get('/songs/stream/:id', songsController.streamSongById);

export default songsRouter;
