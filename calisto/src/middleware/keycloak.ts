import { Request, Response, NextFunction } from "express";
import Token from "keycloak-connect/middleware/auth-utils/token";
import Signature from "keycloak-connect/middleware/auth-utils/signature";
import { CUSTOM_MESSAGE, MESSAGE_RETURN } from "../utils/messages";


interface ILogin {
    clientId?: string,
    content: {
        exp?: number,
        iat?: number,
        jti?: string,
        iss?: string,
        aud?: string,
        sub: string,
        typ?: string,
        azp?: string,
        session_state?: string,
        acr?: string,
        scope?: string,
        sid?: string,
        email_verified?: true,
        name?: string,
        preferred_username?: string,
        given_name?: string,
        family_name?: string,
        email: string | undefined,
    },
    signed?: string
}




export const keycloakRolesMidlleware = (args: string[]) => {

    return (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers?.authorization;
        if (!authHeader) {
            return response?.json(MESSAGE_RETURN([], CUSTOM_MESSAGE("Bearer token fail"), true))
        }

        const [, token] = authHeader.split(" ");

        if (!token) {
            return response?.json(MESSAGE_RETURN([], CUSTOM_MESSAGE("Bearer token invalid"), true))
        }

        try {
            const token_data = new Token(token, process.env.KEYCLOAK_CLIENT_ID);

            if (token_data.content?.realm_access?.roles['ROLE_ADMINISTRATOR']) {
                return next()
            } else {


                const permissionExists = token_data.content?.realm_access?.roles.map(item => item)
                    .some((permission) => args.includes(permission))

                if (!permissionExists) {
                    return response.json(MESSAGE_RETURN([], CUSTOM_MESSAGE("VOCÊ NÃO TEM PERMISSÃO"), true));
                }
                return next()
            }

        } catch (error) {
            // @ts-ignore
            response.json(MESSAGE_RETURN([], CUSTOM_MESSAGE(error.message), true));
        }

    }
}



export const keycloakAuthenticationMidleware = (request: Request, response: Response, next: NextFunction) => {

    const authHeader = request.headers?.authorization;
    if (!authHeader) {
        return response?.json(MESSAGE_RETURN([], CUSTOM_MESSAGE("Bearer token fail"), true))
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
        return response?.json(MESSAGE_RETURN([], CUSTOM_MESSAGE("Bearer token invalid"), true))
    }

    try {
        // @ts-ignore 
        const token_data = new Token(token, process.env.KEYCLOAK_CLIENT_ID) as ILogin;


        if (token_data.content.exp == 0) {
            return response?.status(400).json(MESSAGE_RETURN([], CUSTOM_MESSAGE("token invalid"), true))
        }

        const signature = new Signature({
            realmUrl: process.env.KEYCLOAK_REALM_URL,
            publicKey: process.env.KEYCLOAK_PUBLIC_KEY,
            minTimeBetweenJwksRequests: 0
        });



        try {
            signature.verify(token_data, null).then((t: ILogin) => {
                request.user = t
                console.log(t);
                
                next();

            }).catch(error => {
                console.log(error);

                return response.json(MESSAGE_RETURN([], CUSTOM_MESSAGE(error.message), true));
            });

        } catch (error) {
            // @ts-ignore
            return response.json(MESSAGE_RETURN([], CUSTOM_MESSAGE(error.message), true));
        }
    } catch (error) {
        // @ts-ignore
        response.json(MESSAGE_RETURN([], CUSTOM_MESSAGE(error.message), true));
    }

}