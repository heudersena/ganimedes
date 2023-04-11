import { Request, Response } from "express";
import { WithDrawDatabase } from "../services/WithDrawDatabase";
import { UpdateWithDrawInterface } from "../interfaces/UpdateWithDrawInterface"

export class WithDrawController {

    static async index(request: Request, response: Response) {
        const keycloak_id = request.user.content.sub
        const content = await WithDrawDatabase.index(keycloak_id)
        response.json(content)
    }
    static async getBayId(request: Request, response: Response) {
        const id = request.params.id
        const content = await WithDrawDatabase.getBayId(id)
        response.json(content)
    }

    static async store(request: Request, response: Response) {
        const amount = Number(request.body.amount)
        const keycloak_id = request.user.content.sub
        const content = await WithDrawDatabase.requestWithdrawal(amount, keycloak_id)
        if (!content.error) {
            request.io.emit("SOLICITACAO_SAQUE")
            return response.status(200).json(content)
        }
        return response.status(400).json(content)
    }

    static async update(request: Request, response: Response) {
        const keycloak_id = request.user.content.sub
        const status = request.body.status

        const id = request.params.id
        const content = await WithDrawDatabase.update(id, keycloak_id, status)
        response.json(content)
    }
}