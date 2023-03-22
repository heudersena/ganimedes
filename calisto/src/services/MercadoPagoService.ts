import { prisma } from "../db";

export class MercadoPagoService {
    static async updated(id: string, request: any) {
        const content = await prisma.mercadoPago.findFirst({ where: { m_id: id } })

        if (!content) return null


        return await prisma.mercadoPago.update({
            where: {
                id: content.id
            },
            data: {
                m_action: request.m_action,
                m_status: request.m_status,
                m_transaction_id: request.m_transaction_id,
                m_net_received_amount: request.m_net_received_amount,
                m_total_paid_amount: request.m_total_paid_amount
            }
        })

    }

    static async mercadoPagoId(id: string) {
        const content = await prisma.mercadoPago.findFirst({ where: { m_id: id }, include: { transaction: { select: { id: true } } } });
        return content?.transaction.id
    }
}
