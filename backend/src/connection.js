import db from './config/db/db.js'

export const dbConnect = async () => {
  try {
    await db.authenticate()
    console.log('base de datos en linea')
  } catch (error) {
    console.error('❌ Error de conexión:', error.original)
    throw new Error('error al levantar la base de datos', error)
  }
}
