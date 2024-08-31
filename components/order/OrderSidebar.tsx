import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"
import Logo from "@/components/ui/Logo";


// Obtener los datos de la base de datos
async function getCategories(){
  //traemos todas las categorias
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {

  const categories = await getCategories()

  return (
    <aside
      className="md:w-72 md:h-screen bg-white"
    >
      <Logo />
      <nav className="mt-10">
          {categories.map(category => (
            <CategoryIcon
              key={category.id}
              category={category}
            />
          ))}
      </nav>

    </aside>
  )
}
