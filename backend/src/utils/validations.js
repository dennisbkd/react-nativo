import z from 'zod'
export class Validation {
  static SchemaUser = z.object({
    nombreUsuario: z.string().max(15, { message: 'Nick demasiado largo' }),
    nombre: z.string({ message: 'Necesita ser solo texto' }),
    password: z.string(),
    confirm: z.string(),
    correo: z.string().email({ message: 'Se necesita un email' }),
    telefono: z.string(),
    direccion: z.string(),
    tipoUsuario: z.enum(['cliente', 'empleado', 'administrador']).default('cliente'),
    idRol: z.number().min(1).default(4),
    idEstado: z.number().min(1).default(3)
  })

  static registerUser (data) {
    return this.SchemaUser.refine((data) => data.password === data.confirm, {
      message: 'contrasena incorrecta',
      path: ['confirm']
    }).safeParse(data)
  }

  static loginUser (user) {
    return this.SchemaUser.partial().safeParse(user)
  }
}
