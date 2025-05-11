import { Router } from 'express'
import { PedidosController } from '../controllers/pedidos.js'

export const createPedidoRouter = ({ pedidosModel }) => {
  const pedidoRouter = Router()
  const pedidoController = new PedidosController({ pedidosModel })

  pedidoRouter.post('/', pedidoController.create)
  pedidoRouter.patch('/:id', pedidoController.update)

  return pedidoRouter
}
