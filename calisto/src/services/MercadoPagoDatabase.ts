import { prisma } from "../db";


export class MercadoPagoDatabase {
    static async DatabaseMethodUpdateCron() {
        const expiredTransactions = await prisma.mercadoPago.findMany({ where: { m_status: 'pending' }, select: { m_id: true } })
        return expiredTransactions

    }
}