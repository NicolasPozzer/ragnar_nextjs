// -Esto es un cliente que maneja las conexiones de prisma y basicamente
//si detecta una conexion global ya no crea nuevas conexiones.
//-ayuda tambien a cuando se instancian muchos objetos todo el tiempo.
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma