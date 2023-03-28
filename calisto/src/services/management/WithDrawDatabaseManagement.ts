
import { prisma } from "../../db";
import { ExecuteReturn } from "../../utils/ExecuteReturn"

export class WithDrawDatabaseManagement {
    static async index() {
        const content = await prisma.withdrawal.findMany()
        return ExecuteReturn(content, false, "")
    }
    static async getBayId(id: string) {
        const content = await prisma.withdrawal.findFirst({ where: { id } })
        return ExecuteReturn(content, false, "")
    }

}