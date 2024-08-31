"use client"
import { useStore } from "@/src/store"
import ProductDetails from "@/components/order/ProductDetails";
import { toast } from "react-toastify"
import {useMemo} from "react";
import {formatCurrency} from "@/src/utils";
import {createOrder} from "@/actions/create-order-action";
import {OrderSchema} from "@/src/schema";


export default function OrderSummary() {

  const order = useStore(state => state.order)
  const clearOrder = useStore(state => state.clearOrder)

  // Calcular Total de una lista de Productos con precio y la cantidad
  const total = useMemo(() => order.reduce((total, item) => total +
      (item.quantity * item.price), 0), [order])


  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order

    }

    //Validacion solo de cliente, si no pasa ni ejecuta lo de abajo, esto ahorra consumo de sv.
    const result = OrderSchema.safeParse(data)
    if(!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return // con este return si fallo no ejecuta lo de abajo, gracias al if
    }

    // Esta funcion hace que el servidor retorna el error entonces ahi le mustra
    //el error al cliente con ZOD sino si el cliente le tiene q avisar al server
    //esto hace que puedan hackear la web y pasar la validacion desde el cliente.
    const response = await createOrder(data)
    if(response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
    }


    //Mostrar que funciono
    toast.success('Pedido Realizado Correctamente')
    clearOrder();
  }

  return (
    <aside
      className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5"
    >
        <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

        {order.length === 0 ? (<p
            className="text-center my-10"
          >
            El pedido esta vacio</p>
            ):(

              <div className="mt-5">
                {order.map((item) => (
                  <ProductDetails
                      key={item.id}
                      item={item}
                  />
                ))}

                <p className='text-2xl mt-20 text-center'>
                  Total a Pagar:
                  <span className="font-bold">{formatCurrency(total)}</span>
                </p>

                <form
                  className='w-full mt-10 space-y-5'
                  action={handleCreateOrder}
                >

                  <input
                      type='text'
                      placeholder="Tu Nombre"
                      className="bg-white border border-gray-100 p-2 w-full"
                      name="name"
                  />

                  <input
                      type='submit'
                      className='py-2 rounded uppercase text-white bg-black
                                  w-full text-center cursor-pointer font-bold'
                      value='Confirmar Pedido'
                  />
                </form>

              </div>
        )
          
      }
    </aside>
  )
}