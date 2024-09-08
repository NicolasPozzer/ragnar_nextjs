"use client";

import Image from "next/image"; // Para usar el metodo de mostrar imagenes optimizado de next
import { Category } from "@prisma/client"; // Optimizado de router de next
import Link from "next/link"; // Para manejar enlaces
import { useParams } from "next/navigation"; // Para conseguir params en componentes como este que no se puede

type CategoryIconProps = {
    category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
    const params = useParams<{ category: string }>();

    return (
        <Link
            href={`/order/${category.slug}`}
            className={`${category.slug === params.category ? 'bg-neutral-200' : ''
            } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-16 h-16 relative flex-shrink-0">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt={`Icono de la categoría ${category.name}`}
                />
            </div>

            <span className="text-xl font-bold">
        {category.name}
      </span>
        </Link>
    );
}
