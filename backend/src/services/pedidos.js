import { DataTypes } from 'sequelize'
import db from '../config/db/db.js'

export const pedidosColumns = {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ClienteID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  MeseroID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CocineroID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Fecha: {
    type: DataTypes.DATE,
    defaultValue: db.literal('NOW()')
  },
  Hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  Estado: {
    type: DataTypes.ENUM('Pendiente', 'En preparación', 'Listo', 'Entregado', 'Cancelado'),
    defaultValue: 'Pendiente'
  },
  Reserva: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}

export const detallePedidosColumns = {
  PedidoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProductoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}
/*
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL,
    Descripcion TEXT,
    CategoriaID INT,
*/
export const productoColums = {
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  CategoriaID: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}
