
import { prisma } from "../db";
import { UpdateWithDrawInterface, Profile } from "../interfaces/UpdateWithDrawInterface";
import { ExecuteReturn } from "../utils/ExecuteReturn"

// Withdraw = Saque
export class WithDrawDatabase {
    static async index(keycloak_id: string) {
        const user_id = await this.INTERNAL_GET_ME_USER(keycloak_id)
        const content = await prisma.withdrawal.findMany({
            where: {
                profile_id: user_id?.id!,
                NOT: {
                    status: "accepted"
                }

            },
            orderBy:
            {
                created_at: 'desc'
            },
            take: 7
        })
        return ExecuteReturn(content, false, "")
    }
    static async getBayId(id: string) {
        const content = await prisma.withdrawal.findFirst({ where: { id } })
        return ExecuteReturn(content, false, "")
    }

    static async requestWithdrawal(amount: number, keycloak_id: string) {
        const values = await prisma.profile.findUnique({ where: { keycloak_id } })
        const user_id = await this.INTERNAL_GET_ME_USER(keycloak_id)
        const withdrawal = await prisma.withdrawal.findMany({ where: { profile_id: user_id?.id!, AND: { status: "processing" } } })

        if (Boolean(withdrawal.length)) {
            return ExecuteReturn(withdrawal, true, "VOCÊ JÁ FEZ UMA SOLICITAÇÃO DE SAQUE, AGUARDE O TERMINO DESSE PROCESSO.")
        }

        // VERIFICAR SE AQUANTIDADE SOLICITADA É MENOR OU IGUAL O QUE O USUÁRIO TEM NA CARTEIRA
        if (amount > Number(values?.balance) || user_id?.id === null) {
            return ExecuteReturn(user_id, true, "VALOR QUE VOCÊ SOLICITOU É MAIOR QUE VOCÊ POSSUÍ")
        }

        const saque = await prisma.withdrawal.create({
            data: {
                amount,
                profile_id: user_id?.id!
            }
        })

        return ExecuteReturn(saque, false, "SOLICITAÇÃO FOI CONCLUÍDA COM SUCESSO.")
    }

    static async update(id: string, keycloak_id: string, status: string, message?: string) {
        const oldBalance = await this.INTERNAL_GET_ME_USER(keycloak_id)
        const withdrawal = await prisma.withdrawal.findFirst({ where: { id, AND: { status: 'processing' } } })
        const newBalance = Number(oldBalance?.balance!) - Number(withdrawal?.amount)
        console.log(withdrawal);

        if (status === "accepted" && withdrawal != null) {
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

        } else if (status === "refused" && withdrawal != null) {

            const content = await prisma.withdrawal.update({
                where: { id }, data: {
                    status: "refused",
                    description: message
                }
            })
            return ExecuteReturn(content, false, "VOCÊ RECUSOU A SOLICITAÇÃO")
        } else {
            return ExecuteReturn([], true, "ESTÁ SOLICITAÇÃO NÃO TEVE NENHUMA AÇÃO")
        }

    }

    static async INTERNAL_GET_ME_USER(keycloak_id: string) {
        return await prisma.profile.findUnique({ where: { keycloak_id } })
    }

}