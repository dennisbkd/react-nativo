import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env/db.env' })

const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST
console.log(USER)

// Configuración recomendada para SQL Server
const db = new Sequelize('restaurante', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

export default db
