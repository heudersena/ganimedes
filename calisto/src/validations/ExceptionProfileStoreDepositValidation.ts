import { object, string, number } from "zod";

const messageObrigatoria: string = "ESSE CAMPO É OBRIGATÓRIO PREENCHER (EXEMPLO) 10.22"

export const ExceptionProfileStoreDepositValidation = object({
    body: object({
        balance: number({ required_error: messageObrigatoria,invalid_type_error:"VOCÊ PRECISA PASSAR UM NUMERO VALIDO EXEMPLO 10.22" }).min(1, messageObrigatoria),
    })
})