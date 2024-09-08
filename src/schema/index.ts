import { z } from 'zod'

// VALIDACIONES PARA FORMULARIOS Y OTROS..  CON ZOD,
// FUNCIONA PARA VALIDAREN EL CLIENTE Y SERVIDOR.

export const OrderSchema = z.object({
    name: z.string()
        .min(1, 'Tu Nombre es Obligatorio'),
    telefono: z.string()
        .min(1, 'Tu Telefono es Obligatorio')
        .regex(/^\d+$/, 'El teléfono debe contener solo números'),
    total: z.number()
        .min(1, "Hay errores en la orden"),//si se le pasa 0 en vez de 1, es decir que no hay ningun
    //producto en la listapero como es una lista de carrito siempre tiene q haber uno al cliquear

    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

export const OrderIdSchema = z.object({
    orderId: z.string()
        .transform((value) => parseInt(value))
        .refine( value => value > 0, {message: 'Hay errores..'})
})

export const SearchSchema = z.object({
    search: z.string()
        .trim()
        .min(1, {message: 'La busqueda no puede ir vacia'})
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value))
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string().min(1, {message: 'La imagen es obligatoria!!'})
})