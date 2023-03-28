import mercadopago from "mercadopago"
import dayjs from "dayjs"
import { IMP } from "../services/TransactionDatabase";


mercadopago.configurations.setAccessToken(String(process.env.MERCADO_PAGO_KEY_PROD));

export interface IMercadoPagoCreate {
    transaction_amount: number,
    payment_method_id: "pix",
    payer: {
        email: string
    },
    installments: number,
    date_of_expiration?: string
}

export class MercadoPagoUtils {

    static async CreatePayment(data: IMercadoPagoCreate): Promise<IMP | unknown> {

        try {
            const MercadoPago: IMercadoPagoCreate = {
                transaction_amount: data.transaction_amount,
                payment_method_id: data.payment_method_id,
                payer: {
                    email: data.payer.email
                },
                installments: 1,
                date_of_expiration: String(dayjs(new Date()).add(6, 'minutes').format('YYYY-MM-DDTHH:mm:ss.000ZZ'))
            };

            const content = await mercadopago.payment?.save(MercadoPago)
            return content;

        } catch (error) {
            return error
        }

    }

    static async GetPayment(mercadopago_id: number): Promise<IMP | unknown> {
        try {

            const content = await mercadopago.payment.findById(mercadopago_id) as IMP
            return content;
        } catch (error) {
            return error
        }
    }

}