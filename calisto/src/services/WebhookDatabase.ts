import { prisma } from "../db";
import { MercadoPagoUtils } from "../utils/MercadoPago";
import { MercadoPagoDatabase } from "./MercadoPagoDatabase";
import { IMP } from "./TransactionDatabase";

import Queue from "bull"
import milliseconds from "milliseconds";

const queue = new Queue('Queue', 'redis://192.168.0.103:6379',
    {
        defaultJobOptions: {
            repeat: { every: milliseconds.seconds(5) },
            removeOnComplete: true,
            removeOnFail: true
        },

    });

// queue.clean()
export class WebhookDatabase {

    static async WebHook(request: string, action: string) {
        // PEGAR O ID DA REQUEST QUE VEM DO MERCADO PAGO
        const id = request

        // BUSCAR O REGISTRO NA TABLE MERCADOPAGOS REFERÊNTE AO ID QUE VEIO DA REQUEST DO MERCADO PAGO WEBHOOK
        const _info_mercado_pago = await this.InternalFunctionMercadoPagoGetTransactionId(id)

        const MP = await MercadoPagoUtils.GetPayment(Number(id)) as IMP

        if (_info_mercado_pago?.m_status === "approved") return

        try {
            switch (action) {
                case "payment.updated":
                    if (MP.response.status_detail === "expired") {

                        const mercadopago_update = await prisma.mercadoPago.update({
                            where: {
                                id: _info_mercado_pago?.id
                            },
                            data: {
                                m_action: "updated",
                                m_status: MP.response.status,
                                m_status_detail: MP.response.status_detail,
                                m_net_received_amount: MP.response.transaction_details.net_received_amount,
                                m_transaction_id: MP.response.transaction_details.transaction_id ?? "NULL"
                            }
                        })

                        await prisma.transaction.update({
                            where: {
                                id: mercadopago_update.transaction_id
                            },
                            data: {
                                mercado_pago_transaction_status: MP.response.status
                            }
                        })

                    } else {
                        // ATUALIZAR AS INFORMAÇÕES DA TABLE MERCADOPAGO
                        // - m_action
                        // - m_status
                        // - m_status_detail
                        // - m_net_received_amount
                        // - m_transaction_id
                        const mercadopago_update = await prisma.mercadoPago.update({
                            where: {
                                id: _info_mercado_pago?.id
                            },
                            data: {
                                m_action: "updated",
                                m_status: MP.response.status,
                                m_status_detail: MP.response.status_detail,
                                m_net_received_amount: MP.response.transaction_details.net_received_amount,
                                m_transaction_id: MP.response.transaction_details.transaction_id ?? "NULL"
                            }
                        })

                        // ATUALIZAR AS INFORMAÇÕES DA TABLE TANSACTIONS
                        // - mercadao_pago_transaction_status
                        // Pegar o valor do campo bonus
                        const transaction_update = await prisma.transaction.update({
                            where: {
                                id: mercadopago_update.transaction_id
                            },
                            data: {
                                mercado_pago_transaction_status: MP.response.status
                            }
                        })

                        console.log("transaction_update=>", transaction_update);


                        // ATUALIZAR A TABELA ACCUMULATOR_BONUS
                        // PEGAR O VALOR QUE JÁ EXISTE NA TABELA
                        const acc_bonus = await prisma.accumulator_bonus.findFirst({
                            where: {
                                profile_id: transaction_update.profile_id
                            }
                        })

                        console.log("acc_bonus=>", acc_bonus);


                        // TOMAR O VALOR DA TABELA TRANSACTIONS COM O VALOR DO ACUMULO
                        const total_bonus = Number(acc_bonus?.bonus_amount) + Number(transaction_update.bonus)

                        console.log("TOTAL BONUS: ", total_bonus);


                        const finish = await prisma.accumulator_bonus.update({
                            where: {
                                profile_id: transaction_update.profile_id
                            },
                            data: {
                                bonus_amount: total_bonus
                            }
                        })


                        console.log("finish=> ", finish);

                        // atualizar a carteira do profile
                        const balence_profile = await prisma.profile.findFirst({
                            where: {
                                id: transaction_update?.profile_id
                            }
                        })
                        const balence_transaction = transaction_update?.balance
                        const balence_profile_old = balence_profile?.balance
                        const balance_total_profile = Number(balence_transaction) + Number(balence_profile_old)

                        const profile = await prisma.profile.update({
                            where: {
                                id: transaction_update?.profile_id
                            },
                            data: {
                                balance: balance_total_profile
                            }
                        })

                        console.log("PROFILE::BALANCE:: ", profile);




                    }

                    break
                default:
                    console.log("METHOD::ACTION: ", action);
                    break;
            }
        } catch (error) {
            console.log(error);

        }





        // ATUALIZAR A TABLE ACCUMULATOR_BONUS

        // ATUALIZAR A TABLE PROFILES

        return true;
    }


    static async InternalFunctionMercadoPagoGetTransactionId(mercadopago_id: string) {
        const content = await prisma.mercadoPago.findFirst({
            where: {
                m_id: mercadopago_id
            }
        })

        return content;
    }
    static async cron(mercadopago_id: number) {
        const expiredTransactions = await MercadoPagoDatabase.DatabaseMethodUpdateCron()
        // const MP = await MercadoPagoUtils.GetPayment(Number(mercadopago_id))
        // queue.add({ MP: MP });
        queue.add('transactions', expiredTransactions);

        queue.on("completed", (job, returnavalue) => {
            console.log(returnavalue);

        })

        queue.process(async function (job, done) {
            console.log(job.data);
            done()
        });



        return [];
    }


}

