export class InventarioController {
  constructor ({ inventarioModel }) {
    this.InventarioModel = inventarioModel
  }

  getAll = async (req, res) => {
    const { estado } = req.query
    const inventario = await this.InventarioModel.getAll({ estado })
    res.json(inventario)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const inventario = await this.InventarioModel.getById({ id })
    if (inventario) return res.json(inventario)
    res.status(404).json({ message: 'Plato no Encontrado' })
  }
}
