import { Request, Response } from "express";
import { WithDrawDatabaseManagement } from "../../services/management/WithDrawDatabaseManagement";

export class WithDrawManagementController {
    static async all(request: Request, response: Response) {
        const content = await WithDrawDatabaseManagement.all()
        return response.json(content)
    }

    static async index(request: Request, response: Response) {
        const content = await WithDrawDatabaseManagement.index()
        return response.json(content)
    }
    static async getBayId(request: Request, response: Response) {
        const id = request.params.id
        const content = await WithDrawDatabaseManagement.getBayId(id)
        return response.json(content)
    }

    static async update(request: Request, response: Response) {
        const id = request.params.id
        const keycloakid = request.body.keycloakid
        const description = request.body.description
        const status = request.body.status

        const content = await WithDrawDatabaseManagement.update(id, keycloakid, status, description)
        return response.json({ content })
    }
}