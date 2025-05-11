import { createApp } from './app.js'

import { InventarioModel } from './models/inventario.js'
import { PedidosModel } from './models/pedidos.js'
import { UserModel } from './models/user.js'

createApp({ inventarioModel: InventarioModel, pedidosModel: PedidosModel, userModel: UserModel })
