import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";
import { log } from "console";

type User = {
    name: string;
    email: string;
    avatar_url: string;
}

type SignInData = {
    email: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    signIn: (data: SignInData) => Promise<void>
}

type Props = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<any | null>(null)

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies()

        if (token)
            recoverUserInformation().then(response => {
                setUser(response)
            })

    }, [])

    async function signIn({ email, password }: SignInData) {
        signInRequest({ email, password }).then(token => {

            setCookie(undefined, 'nextauth.token', token, { maxAge: 60 * 60 * 1 })
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            api.post("/profile/me").then(r => {
                setUser(r.data?.user?.data)
            })
        }).catch(err => {
            console.log(err);

        })

        Router.push('/dashboard');

    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}