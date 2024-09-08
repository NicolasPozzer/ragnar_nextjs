// Este archivo sigue siendo un Server Component.
import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";
import ClientScrollHandler from "@/components/client/ClientScrollHandler"; // Componente de cliente
import ClientCarousel from "@/components/client/ClientCarousel"; // Componente de cliente

export default function RootLayout({children}: Readonly<{children: React.ReactNode;
}>) {
    return (
        <>
            <div className="md:flex">
                <OrderSidebar />

                {/* El main que contiene el scroll ahora está manejado por ClientScrollHandler */}
                <ClientScrollHandler>
                    <ClientCarousel/>
                    <div className="p-5">{children}</div>
                </ClientScrollHandler>

                <OrderSummary />
            </div>

            <ToastNotification />
        </>
    );
}
