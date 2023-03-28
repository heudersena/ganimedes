import { Request, Response, NextFunction } from "express"

import { TransactionDatabase } from "../services/TransactionDatabase";

export class TransactionControler {
    static async index(request: Request, response: Response) {
        const content = await TransactionDatabase.DatabaseMethodGetAll(String(request.user.content.email))
        return response.json(content)
    }

}