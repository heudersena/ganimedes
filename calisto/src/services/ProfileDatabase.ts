import { prisma } from "../db";
import { StoreProfileService } from "../interfaces/StoreProfileService";
import { ExecuteReturn } from "../utils/ExecuteReturn";
import { GenetationCPF } from "../utils/GenerationCPF";
import { AccumulatorDatabase } from "./AccumulatorDatabase";

interface IPermissionProfile {
    roles: 'ROLE_ADMINISTRATOR', 'ROLE_EDIT', 'ROLE_OPERATOR', 'ROLE_ATTENDANT', 'ROLE_PLAYER'
}

export class ProfileDatabase {
    static async DatabaseMethodSelectAll() {
        // SOMENTE O ADMINISTRADOR DO SISTEMA IRÁ USAR ESSA FUNÇÃO
        try {
            const content = await prisma.profile.findMany()

            return ExecuteReturn(content)

        } catch (error) {
            return ExecuteReturn([], true, error)
        }
    }

    static async DatabaseMethodGetTotalBalance(keycloak_id: string) {
        try {
            const content = await prisma.profile.findFirst({
                where: {
                    keycloak_id: keycloak_id
                },
                select: {
                    balance: true,
                    bonus: true
                }
            })

            return ExecuteReturn(content)

        } catch (error) {
            return ExecuteReturn([], true, error)
        }
    }

    static async DatabaseMethodSelectOne(keycloak_id: string) {
        try {
            const content = await prisma.profile.findFirst({
                where: {
                    keycloak_id: keycloak_id
                },
                orderBy: { created_at: "desc" }
            })

            return ExecuteReturn(content)

        } catch (error) {
            return ExecuteReturn([], true, error)
        }
    }

    static async DatabaseMethodCreation(input: StoreProfileService) {
        try {
            console.log("0000000000000000000000000000000000");

            console.log(await this.DatabaseMethodAuxiliariesCheckExistsCPF(input.cpf));
            console.log(await this.DatabaseMethodAuxiliariesCheckExistsEMAIL(input.email));


            console.log("0000000000000000000000000000000000");

            // VERIFICAR SE EXISTE CPF JÁ CADASTRADO
            if (await this.DatabaseMethodAuxiliariesCheckExistsCPF(input.cpf) || await this.DatabaseMethodAuxiliariesCheckExistsEMAIL(input.email)) {
                return ExecuteReturn([], true, "EMAIL OU CPF JÁ EXISTE EM NOSSOS CADASTRO!")
            }


            // VERIFICAR SE EXISTE EMAIL JÁ CADASTRADO

            const content = await prisma.profile.create({
                data: {
                    keycloak_id: input.keycloak_id,
                    first_name: input.first_name,
                    second_name: input.second_name,
                    email: input.email,
                    cpf: input.cpf ?? GenetationCPF(),
                    balance: input.balance ?? 0.00,
                    bonus: input.bonus ?? 0.00,
                    phone: input.phone,
                    type_profile: "ROLE_PLAYER",
                    keyPix: input.keyPix,
                    reference_code: input.reference_code ?? "NULL"
                }
            })

            const accumulator_create = await AccumulatorDatabase.DatabaseMethodCreation(content.id)

            return ExecuteReturn({ content, accumulator_create })

        } catch (error) {
            return ExecuteReturn([], true, error)
        }

    }

    static async DatabaseMethodEditAdmin(id: string, permission: IPermissionProfile, code: string) {
        // SOMENTE USADO PELO ADMINISTRADOR DO SISTEMA
        try {
            const content = await prisma.profile.update({
                where: {
                    id: id
                },
                data: {
                    type_profile: permission.roles,
                    reference_code: code
                }
            })

            return ExecuteReturn(content)

        } catch (error) {
            return ExecuteReturn([], true, error)
        }
    }

    static async DatabaseMethodEditUser(keycloak_id: string, phone: string, cpf: string, keyPix: string) {
        try {

            const content = await prisma.profile.update({
                where: {
                    keycloak_id: keycloak_id
                },
                data: {
                    phone: phone,
                    cpf: cpf,
                    keyPix: keyPix
                }
            })

            return ExecuteReturn(content)

        } catch (error) {
            return error
        }

    }

    static async DatabaseMethodAuxiliariesCheckExistsCPF(cpf: string) {
        if (cpf === undefined) {
            return false
        }

        const content = await prisma.profile.findFirst({
            where: {
                cpf: cpf
            }
        })
        return Boolean(content)

    }

    static async DatabaseMethodAuxiliariesCheckExistsEMAIL(email: string) {
        const content = await prisma.profile.findFirst({
            where: {
                email: email
            }
        })

        return Boolean(content)

    }

}