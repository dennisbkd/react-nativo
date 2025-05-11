export class PedidosController {
  constructor ({ pedidosModel }) {
    this.pedidosModel = pedidosModel
  }

  create = async (req, res) => {
    const result = req.body
    const nuevoPedido = await this.pedidosModel.create({ input: result })
    res.status(201).json(nuevoPedido)
  }

  update = async (req, res) => {
    const { id } = req.params
    const updatePedido = await this.pedidosModel.update({ id, input: req.body })
    return res.json(updatePedido)
  }
}
