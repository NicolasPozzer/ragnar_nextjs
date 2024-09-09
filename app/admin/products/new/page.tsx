import Heading from "@/components/ui/Heading";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import ProtectedPage from "@/components/ProtectedPage";


export default function OrderPage() {
  return (
        <ProtectedPage>
          <Heading>Nuevo Producto</Heading>

          <AddProductForm>
              <ProductForm />
          </AddProductForm>
        </ProtectedPage>
  )
}
