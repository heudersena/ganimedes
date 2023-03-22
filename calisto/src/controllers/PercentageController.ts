import { Request, Response } from "express"
import { PercentegeToDayDatabase } from "../services/PercentegeToDayDatabase"

export class PercentageController {
    static async index(request: Request, response: Response) {
        const content = await PercentegeToDayDatabase.DatabaseMethodSelectAll()
        return response.json(content)
    }

    static async store(request: Request, response: Response) {
        const money = Number(request.body.money);
        const content = await PercentegeToDayDatabase.DatabaseMethodCreation(money)
        return response.json(content)
    }
}