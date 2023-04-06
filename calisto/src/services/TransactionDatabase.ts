import { prisma } from "../db";
import { MercadoPagoUtils } from "../utils/MercadoPago";
import { PercentegeToDayDatabase } from "./PercentegeToDayDatabase";
import { ProfileDatabase } from "./ProfileDatabase";

interface action_rule {
    created: 'created',
    updated: 'updated'
};

interface status_role {
    accredited: 'accredited',
    cancelled: 'cancelled',
    pending_waiting_transfer: 'pending_waiting_transfer'
};

interface ITransactionCreation {
    transaction_id: string
    m_id: string
    m_action: action_rule
    m_status: string
    m_status_detail: status_role
    m_net_received_amount: number
    m_total_paid_amount: number
    m_transaction_id: string
    m_qr_code: string
    m_ticket_url: string
    m_qr_code_base64?: string | null
}





export interface IMP {
    response: {
        id: number,
        status: 'pending', 'approved', 'cancelled', string,
        status_detail: 'accredited' | 'cancelled' | 'pending_waiting_transfer' | 'expired',
        payer: {
            email: string
        },
        transaction_details: {
            payment_method_reference_id: null,
            acquirer_reference: null,
            net_received_amount: 0,
            total_paid_amount: 100,
            overpaid_amount: 0,
            external_resource_url: null,
            installment_amount: 0,
            financial_institution: null,
            payable_deferral_period: null,
            bank_transfer_id: null,
            transaction_id: null
        },
        point_of_interaction: {
            transaction_data: {
                qr_code: string,
                transaction_id: string,
                ticket_url: string,
                qr_code_base64: string
            }
        }
    }
}


export class TransactionDatabase {

    static async DatabaseMethodGetAll(email: string) {
        const content = await prisma.profile.findMany({
            where: {
                email: email
            },
            include: {
                Transaction: {
                    include: { MercadoPago: true },
                    orderBy: {
                        created_at: "desc"
                    },
                    where: {
                        mercado_pago_transaction_status: "pending"

                    },
                    take: 5

                }

            },
            orderBy: {
                created_at: "desc"
            }
        })

        return content[0]?.Transaction
    }

    static async DatabaseMethodCreation(keycloak_id: string, money: number) {
        try {

            // PRA QUEM É ESSA TRANSAÇÃO -  VERIFICAR PELO KEYCLOAK_ID
            const profile = await ProfileDatabase.DatabaseMethodSelectOne(keycloak_id)
            const user_id = profile.data.id


            // PEGAR A PORCENTAGEM
            const percentages = await PercentegeToDayDatabase.DatabaseMethodSelectAll()
            const _percentage = percentages.data

            // CALCULAR A PORCENTAGEM GANHA DESTA TRANSAÇÃO
            const _percentege_bonus = (money * _percentage) / 100


            // UTILIZAR A API DO MERCADO PAGO - RETORNA OS DADOS
            const mp = await MercadoPagoUtils.CreatePayment({
                transaction_amount: money,
                payment_method_id: "pix",
                installments: 1,
                payer: {
                    email: profile.data?.email
                }

            }) as IMP


            // RECEBER O MONEY PARA CADASTRAR A TRANSAÇÃO.
            const transaction = await prisma.transaction.create({
                data: {
                    profile_id: user_id,
                    balance: money,
                    bonus: _percentege_bonus,
                    percentage_bonus: _percentage,
                    type_transaction: "ROLE_DEPOSIT"
                }
            })

            // CADATRAR NA TABELA DO MERCADOPAGOS ESSA TRANSAÇÃO

            const mercado_pago = await prisma.mercadoPago.create({
                data: {
                    m_id: String(mp.response?.id),
                    m_action: "created",
                    m_qr_code: mp.response?.point_of_interaction.transaction_data.qr_code,
                    m_status: mp.response?.status,
                    m_net_received_amount: mp.response?.transaction_details.net_received_amount,
                    m_ticket_url: mp.response?.point_of_interaction.transaction_data.ticket_url,
                    m_total_paid_amount: mp.response?.transaction_details.total_paid_amount,
                    m_status_detail: mp.response?.status_detail,
                    m_transaction_id: mp.response?.point_of_interaction.transaction_data.transaction_id ?? "null",
                    m_qr_code_base64: mp.response?.point_of_interaction.transaction_data.qr_code_base64,
                    transaction_id: transaction?.id
                }
            })
            return { transaction, mercado_pago, mp }
        } catch (error) {
            return error
        }




    }
}