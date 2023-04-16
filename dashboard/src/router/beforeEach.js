const CHAVE_LOCAL = "c7dc0ec8-e4d1-4782-856f-b697c7c4c813";

export default async (to, from, next) => {

    if (to.name === "login" && localStorage.getItem(CHAVE_LOCAL) === '1') {
        return next({ name: "home" })
    }

    if (to.name !== "login" && localStorage.getItem(CHAVE_LOCAL) !== '1') {
        return next({ name: "login" })
    }



    next();



};
