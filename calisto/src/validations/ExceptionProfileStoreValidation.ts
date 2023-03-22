import { object, string, number } from "zod";

const messageObrigatoria: string = "ESSE CAMPO É OBRIGATÓRIO PREENCHER"
const messageInvalida: string = "TIPO INVÁLIDO"

export const ExceptionProfileStoreValidation = object({
    body: object({
        phone: string({ required_error: messageObrigatoria }).trim().min(1, messageObrigatoria),
        keyPix: string().trim().min(1, messageObrigatoria)
    })
})