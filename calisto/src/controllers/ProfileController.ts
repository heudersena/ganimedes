import { Request, Response, NextFunction } from "express"
import { InternalFunctionService } from "../services/InternalFunctionService";
import { ProfileDatabase } from "../services/ProfileDatabase";
// import { ProfileService } from "../services/ProfileService";
import { TransactionDatabase } from "../services/TransactionDatabase";

const fn = new InternalFunctionService();

class ProfileController {

    static async me(request: Request, response: Response, next: NextFunction) {
        return response.json(request.user)
    }

    static async index(request: Request, response: Response, next: NextFunction) {
        // const content = await ProfileService.index(request.user.content.sub)
        console.log(request.user);
        
        return response.json({ content: request.user })
    }

    static async store(request: Request, response: Response, next: NextFunction) {

        const input = {
            ...request.body,
            first_name: request.user?.content.given_name,
            second_name: request.user?.content.family_name,
            email: request.user?.content.email,
            keycloak_id: request.user?.content.sub
        }



        const content = await ProfileDatabase.DatabaseMethodCreation(input)
        return response.json(content)
    }

    static async store_deposit(request: Request, response: Response, next: NextFunction) {
        const balance = Number(request.body.balance)
        console.log(balance);        
        const content = await TransactionDatabase.DatabaseMethodCreation(request.user.content.sub, balance)
        return response.json(content)
    }


    static async request_withdrawal(request: Request, response: Response, next: NextFunction) {
        const data_body = {
            ...request.body,
            keycloak_id: request.user?.content.sub
        }
        // const content = await ProfileService.request_withdrawal(data_body)

        return response.json([])

    }

}


export { ProfileController }