
import { prisma } from "../../db";
import { ExecuteReturn } from "../../utils/ExecuteReturn"

export class WithDrawDatabaseManagement {
    static async all() {
        const content = await prisma.withdrawal.findMany({
            include: {
                profile: true
            }
        })
        return ExecuteReturn(content, false, "")
    }
    static async index() {
        const content = await prisma.withdrawal.findMany({
            where: {
                status: "processing"
            },
            include: {
                profile: true
            }
        })
        return ExecuteReturn(content, false, "")
    }
    static async getBayId(id: string) {
        const content = await prisma.withdrawal.findFirst({ where: { id } })
        return ExecuteReturn(content, false, "")
    }

    static async update(id: string, keycloak_id: string, status: string, description: string) {
        console.log(id, keycloak_id, status, description);

        // buscar o usuário
        const user = await prisma.profile.findUnique({ where: { keycloak_id: keycloak_id } })
        const saque = await prisma.withdrawal.findUnique({ where: { id } })
        const newBalance = Number(user?.balance!) - Number(saque?.amount)

        if (status === "accepted") {

            try {
                const content = await prisma.$transaction([
                    prisma.profile.update({
                        where: { keycloak_id: keycloak_id }, data: {
                            balance: newBalance
                        }
                    }),
                    prisma.withdrawal.update({
                        where: { id }, data: {
                            status: "accepted"
                        }
                    })
                ])
                return ExecuteReturn(content, false, "ATUALIZADA COM SUCESSO")
            } catch (error) {
                return ExecuteReturn(error, true, "Ops!")
            }

        } else if (status === "refused") {
            const content = await prisma.withdrawal.update({
                where: { id }, data: {
                    status: "refused",
                    description: description
                }
            })
        } else {
            return ExecuteReturn([], true, "Ops!")
        }

        return [id, keycloak_id, status, description]
    }

}