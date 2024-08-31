import Heading from "@/components/ui/Heading";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";


export default function OrderPage() {
  return (
    <>
      <Heading>Nuevo Producto</Heading>

      <AddProductForm>
          <ProductForm />
      </AddProductForm>
    </>
  )
}
