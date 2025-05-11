import { SALT_ROUNDS, SECRET_WORD } from '../config/config.js'
import db from '../config/db/db.js'
import { clientWebColums, userColumns } from '../services/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserModel {
  static User = db.define('Usuario', userColumns,
    {
      timestamps: false,
      freezeTableName: true
    }
  )

  static ClienteWeb = db.define('ClienteWeb', clientWebColums, {
    timestamps: false,
    freezeTableName: true
  })

  static async registerUser ({ input }) {
    const {
      nombreUsuario, nombre, password, correo, telefono, tipoUsuario, idRol, idEstado
    } = input.data

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    try {
      const [nuevoUsuario, created] = await this.User.findOrCreate(
        {
          where: { nombreUsuario, correo },
          defaults: {
            nombreUsuario,
            nombre,
            password: hashedPassword,
            correo,
            telefono,
            tipoUsuario,
            idRol,
            idEstado
          }
        })

      if (!created) {
        return { error: 'Error: Usuario existente' }
      }

      return await this.User.findByPk(nuevoUsuario.id)
    } catch (error) {
      throw new Error('Error al crear nuevo Usuario', error)
    }
  }

  static async loginUser ({ input }) {
    const { password, nombreUsuario } = input.data
    const user = await this.User.findOne({ where: { nombreUsuario } })
    if (!user) return { error: 'Error: Usuario  no existente' }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return { error: 'Error: password no existente' }

    const token = jwt.sign({
      id: user.id,
      email: user.correo,
      username: user.nombreUsuario,
      tipoRol: user.idRol
    },
    SECRET_WORD,
    {
      expiresIn: '1hr'
    })

    return {
      user: {
        email: user.correo,
        userName: user.nombreUsuario,
        rol: user.idRol
      },
      token
    }
  }

  static async profile ({ input }) {
    const id = input.id
    const user = await this.User.findByPk(id)
    if (!user) return { error: 'Error: Usuario  no existente' }
    return {
      user: {
        email: user.correo,
        userName: user.nombreUsuario,
        rol: user.idRol
      }
    }
  }
}
