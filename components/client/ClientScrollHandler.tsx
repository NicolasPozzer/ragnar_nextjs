"use client"; // Componente cliente

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ClientScrollHandler({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [isScrolled, setIsScrolled] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (mainRef.current && mainRef.current.scrollTop > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const mainElement = mainRef.current;
        if (mainElement) {
            mainElement.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (mainElement) {
                mainElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
                    isScrolled ? "-translate-y-full" : "translate-y-0"
                }`}
            >
                <div className="relative group">
                    {/* Fondo con hover de opacidad */}
                    <div className="absolute inset-0 bg-white transition-opacity duration-300 ease-in-out opacity-30 group-hover:opacity-80"></div>

                    {/* Contenedor del logo con tamaño fijo */}
                    <div className="relative py-4 px-6 flex justify-center items-center">
                        {/* Establece un tamaño fijo para el contenedor del logo */}
                        <div className="w-[50px] h-[48px] flex justify-center items-center">
                            <Image
                                src="/logo/logo.svg"
                                width={150} // Tamaño del logo
                                height={150} // Tamaño del logo
                                alt="Logo"
                                className="w-auto h-auto"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Añadimos la referencia al main */}
            <main ref={mainRef} className="md:flex-1 md:h-screen md:overflow-y-scroll">
                {children}
            </main>
        </>
    );
}
