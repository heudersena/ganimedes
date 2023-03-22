import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            user: {
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

            io: any
        }
    }
}