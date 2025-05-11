import { DataTypes } from 'sequelize'

export const userColumns = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipoUsuario: {
    type: DataTypes.ENUM('cliente', 'empleado', 'administrador'),
    defaultValue: 'cliente',
    allowNull: false
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idEstado: {
    type: DataTypes.INTEGER,
    defaultValue: 'activo',
    allowNull: false
  }
}

export const clientWebColums = {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  puntosFidelidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
}
