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
router.post('/register', userController.create)

router.get('/user', authMiddleware.ADMIN, userController.findAll)
router.put('/user/:id', authMiddleware.ADMIN, userController.update)
router.delete('/user/:id', authMiddleware.ADMIN, userController.delete)

router.post('/playlist', authMiddleware.USER, playlistController.create)
router.get('/playlist/:idUser', authMiddleware.USER, playlistController.findAll)
router.delete('/playlist/:idUser/:idPlaylist', authMiddleware.USER, playlistController.delete)
router.put('/playlist/:idUser/:idPlaylist', authMiddleware.USER, playlistController.update)
