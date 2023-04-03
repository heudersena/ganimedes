import { Request, Response, NextFunction } from "express"
import { prisma } from "../db";
import { MercadoPagoService } from "../services/MercadoPagoService";
import { WebhookDatabase } from "../services/WebhookDatabase";
import { MercadoPagoUtils } from "../utils/MercadoPago"
import { CUSTOM_MESSAGE, MESSAGE_RETURN } from "../utils/messages";

// https://stackoverflow.com/questions/48027563/typescript-type-annotation-for-res-body

interface IWebHook {
    action: string,
    api_version: string,
    application_id: string,
    date_created: string,
    id: string,
    live_mode: string,
    type: string,
    user_id: number,
    data: { id: string }
}

interface CustomRequest<T> extends Request {
    body: T
}

export class WebhookController {

    static async webhook(request: CustomRequest<IWebHook>, response: Response, next: NextFunction) {
        try {
            const content = await WebhookDatabase.WebHook(request.body.data.id, request.body.action);
            return response.json({ "MethodPayment": true })
        } catch (error) {
            console.log(error);
            return response.json(error)
        }



    }

    static async cron(request: CustomRequest<IWebHook>, response: Response, next: NextFunction) {
        const id = request.query.id
        const content = await WebhookDatabase.cron(Number(id)) as any

        const contentMap = {
            status: content?.body?.status,
            status_detail: content?.body?.status_detail,
            ...content?.response
        }
        return response.json(contentMap)
    }
}