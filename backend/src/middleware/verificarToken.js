import jwt from 'jsonwebtoken'
import { SECRET_WORD } from '../config/config.js'

export const verificarToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json({ error: 'Token no habilitado' })

  jwt.verify(token, SECRET_WORD, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })

    req.user = user
    next()
  })
}
