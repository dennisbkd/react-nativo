/* eslint-disable camelcase */
import db from '../config/db/db.js'
import { pedidosColumns, productoColums } from '../services/pedidos.js'

export class PedidosModel {
  static Pedido = db.define('Pedido', pedidosColumns, {
    timestamps: false,
    freezeTableName: true
  })

  static Producto = db.define('Producto', productoColums, {
    timestamps: false,
    freezeTableName: true
  })

  static async create ({ input }) {
    this.Pedido.belongsToMany(this.Producto, {
      through: 'DetallePedido',
      foreignKey: 'PedidoID'
    })
    this.Producto.belongsToMany(this.Pedido, {
      through: 'DetallePedido',
      foreignKey: 'ProductoID'
    })

    const {
      ClienteID,
      MeseroID,
      CocineroID,
      Fecha,
      Hora,
      Estado,
      Reserva,
      Productos
    } = input

    try {
      const nuevoPedido = await this.Pedido.create({
        ClienteID,
        MeseroID,
        CocineroID,
        Fecha,
        Hora,
        Estado,
        Reserva
      })
      for (const producto of Productos) {
        await nuevoPedido.addProducto(producto.ProductoID, {
          through: {
            Cantidad: producto.Cantidad,
            Precio: producto.Precio
          }
        })
      }
      const resultado = await this.Pedido.findByPk(nuevoPedido.ID, {
        include: this.Producto,
        through: {
          attributes: ['Cantidad', 'Precio']
        }
      })
      return resultado
    } catch (error) {
      throw new Error(`Error al crear un nuevo pedido: ${error}`)
    }
  }

  static async update ({ id, input }) {
    console.log(input)
    const {
      ClienteID,
      MeseroID,
      CocineroID,
      Fecha,
      Hora,
      Estado,
      Reserva
    } = input
    try {
      await this.Pedido.update({
        ClienteID,
        MeseroID,
        CocineroID,
        Fecha,
        Hora,
        Estado,
        Reserva
      },
      {
        where: { id }
      })
      const updatePedido = this.Pedido.findByPk(id)
      return updatePedido
    } catch (error) {
      throw new Error(`Error al actualizar el pedido: ${error}`)
    }
  }
}
