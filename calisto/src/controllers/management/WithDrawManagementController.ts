import { Request, Response } from "express";
import { WithDrawDatabaseManagement } from "../../services/management/WithDrawDatabaseManagement";

export class WithDrawManagementController {

    static async index(request: Request, response: Response) {
        const content = await WithDrawDatabaseManagement.index()
        return response.json(content)
    }
    static async getBayId(request: Request, response: Response) {
        const id = request.params.id
        const content = await WithDrawDatabaseManagement.getBayId(id)
        return response.json(content)
    }
}