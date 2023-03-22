const SUCCESS_MESSAGE = () => "OPERAÇÃO EXECUTADA COM SUCESSO.";
const ERROR_AUTORIZACAO = () => "VOCÊ NÃO TEM PERMISSÃO PARA GERENCIAR ESSE REGISTRO.";
const ERROR_MESSAGE = () => "OPS! OCORREU ALGUM ERROR.";
const ERROR_LOGIN = () => "OPS! CPF OU SENHA INVÁLIDO";
const ERROR_JWT = () => "OPS! TOKEN INVÁLIDO";
const ERROR_USER_PASSWORD = () => "OPS! USUÁRIO OU SENHA INVÁLIDOS";
const ERROR_NULL = () => "OPS! ESSA SOLICITAÇÃO NÃO RETORNOU NENHUM REGISTRO.";
const ERROR_EMAIL_OR_CPF = () => "EMAIL OU CPF JÁ EXISTE EM NOSSOS CADASTRO!";
const CUSTOM_MESSAGE = (message: string) => message;

const MESSAGE_RETURN = function (data: any, fn, error = false) {
        return {
                error: error,
                content: data,
                message: fn
        }
}

export {
        ERROR_MESSAGE,
        ERROR_AUTORIZACAO,
        SUCCESS_MESSAGE,
        ERROR_LOGIN,
        ERROR_JWT,
        ERROR_USER_PASSWORD,
        ERROR_NULL,
        CUSTOM_MESSAGE,
        ERROR_EMAIL_OR_CPF,
        MESSAGE_RETURN
}