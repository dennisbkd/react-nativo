import { Router } from 'express'
import { UserController } from '../controllers/user.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { clearToken } from '../middleware/clearToken.js'

export const createAuthUserRouter = ({ userModel }) => {
  const AuthRouter = Router()
  const userController = new UserController({ userModel })

  AuthRouter.post('/register', userController.registerUser)
  AuthRouter.post('/login', userController.loginUser)
  AuthRouter.get('/verify', verificarToken, userController.profile)
  AuthRouter.get('/logout', clearToken)

  return AuthRouter
}
