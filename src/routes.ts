import express from 'express'
import { PlaylistController, UserController } from './controllers'
import { LoginCotroller } from './controllers/LoginCotroller'
import { AuthMiddleware } from './middlewares/AuthMiddleware'
import { PlaylistService } from './services/PlaylistSevice'
import { UserService } from './services/UserService'

export const router = express()

const userService = new UserService()
const playlistService = new PlaylistService()

const authMiddleware = new AuthMiddleware()

const userController = new UserController(userService)
const playlistController = new PlaylistController(playlistService)
const loginController = new LoginCotroller(userService)

router.post('/login', loginController.login)
router.post('/user', userController.create)

router.get('/user', authMiddleware.ADMIN, userController.findAll)
router.delete('/user/:id', authMiddleware.ADMIN, userController.delete)
router.put('/user/:id', authMiddleware.ADMIN, userController.update)

router.post('/playlist', authMiddleware.USER, playlistController.create)
router.get('/playlist', authMiddleware.USER, playlistController.findAll)
router.delete('/playlist/:idPlaylist', authMiddleware.USER, playlistController.delete)
router.put('/playlist/:idPlaylist', authMiddleware.USER, playlistController.update)
