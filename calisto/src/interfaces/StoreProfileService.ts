
export interface StoreProfileService {
    keycloak_id: string,
    first_name: string,
    second_name: string,
    email: string,
    cpf: string,
    balance: number,
    bonus: number,
    phone: string,
    keyPix: string,
    type_profile: "ROLE_ADMINISTRATOR" | "ROLE_EDIT" | "ROLE_OPERATOR" | "ROLE_ATTENDANT" | "ROLE_PLAYER",
    reference_code: string,
    
}