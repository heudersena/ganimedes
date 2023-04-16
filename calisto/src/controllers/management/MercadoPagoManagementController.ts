import { Request, Response } from "express";
import { MercadoPagoDatabaseManagement } from "../../services/management/MercadoPagoDatabaseManagement";

export class MercadoPagoManagementController {
    static async CREDITO_MERCADO_PAGO(request: Request, response: Response) {
        try {
            const content = await MercadoPagoDatabaseManagement.VIEW_CREDITO_MERCADO_PAGO();
            // @ts-ignore
            console.log(content);      
            return response.json(content)
        } catch (error) {
            response.json(error)
        }
    }
}