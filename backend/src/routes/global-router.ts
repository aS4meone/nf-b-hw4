import { Router } from 'express'
import authRouter from './auth/auth-router'
import songsRouter from './songs/songs-routes'

const globalRouter = Router()

globalRouter.use('/auth', authRouter);
globalRouter.use(songsRouter)
export default globalRouter
