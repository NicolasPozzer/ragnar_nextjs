import {Order, OrderProducts, Product} from "@prisma/client";

// Tomo atributos de Product con Pick y le creo 2 atributos nuevos tamb.
export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}

export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}