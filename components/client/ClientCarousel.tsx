"use client"; // Este componente se renderiza en el cliente

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ClientCarousel() {
    const images = ["/carrousel/image1.svg", "/carrousel/image2.svg", "/carrousel/image3.svg"];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Cambia la imagen cada 3 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="w-full h-64 overflow-hidden relative mt-20">
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    width={10000}
                    height={64}
                    alt={`Imagen ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}
        </div>
    );
}
