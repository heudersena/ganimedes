export interface UpdateWithDrawInterface {
    processing: string
    accepted: string
    refused: string
}


const ROLE_PROFILE = {
    ROLE_ADMINISTRATOR: 'ROLE_ADMINISTRATOR',
    ROLE_EDIT: 'ROLE_EDIT',
    ROLE_OPERATOR: 'ROLE_OPERATOR',
    ROLE_ATTENDANT: 'ROLE_ATTENDANT',
    ROLE_PLAYER: 'ROLE_PLAYER'
};

export type ROLE_PROFILE = (typeof ROLE_PROFILE)[keyof typeof ROLE_PROFILE]


export interface Profile {
    id: string
    keycloak_id: string | null
    first_name: string
    second_name: string
    email: string
    cpf: string | null
    balance: number | null
    bonus: number | null
    phone: string
    keyPix: string
    type_profile: ROLE_PROFILE
    reference_code: string
    created_at: Date
    updated_at: Date
}