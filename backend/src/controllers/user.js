import { Validation } from '../utils/validations.js'

export class UserController {
  constructor ({ userModel }) {
    this.UserModel = userModel
  }

  registerUser = async (req, res) => {
    const result = Validation.registerUser(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newUser = await this.UserModel.registerUser({ input: result })
    if (newUser.error) return res.status(400).json({ error: newUser.error })

    return res.status(201).json(newUser)
  }

  loginUser = async (req, res) => {
    const result = Validation.loginUser(req.body)
    if (!result.success) {
      return res.status(401).json({ error: JSON.parse(result.error.message) })
    }

    const logUser = await this.UserModel.loginUser({ input: result })
    if (logUser.error) return res.status(400).json({ error: logUser.error })
    res.cookie('access_token', logUser.token, {
      httpOnly: false,
      secure: false, // true en producción
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
      path: '/'
    })
      .json({ user: logUser.user })
  }

  profile = async (req, res) => {
    console.log(req.user)
    const profileUser = await this.UserModel.profile({ input: req.user })
    if (!profileUser) {
      return res.status(400)
        .json({ error: profileUser.error })
    }
    return res.status(201).json(profileUser.user)
  }
}
