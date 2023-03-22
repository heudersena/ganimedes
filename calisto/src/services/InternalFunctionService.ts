import { prisma } from "../db"

class InternalFunctionService {

    FN_LOCAL_VERIFY_EMAIL_EXIST = async (email: string) => {
        const returns = await prisma.profile.findUnique({ where: { email: email } })
        if (returns) return true
        return false
    }

    FN_LOCAL_VERIFY_CPF_EXIST = async (cpf: string) => {
        const returns = await prisma.profile.findUnique({ where: { cpf: cpf } })
        if (returns) return true
        return false
    }

}

export { InternalFunctionService }