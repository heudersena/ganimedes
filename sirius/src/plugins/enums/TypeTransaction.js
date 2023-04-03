export function TypeTransaction(type) {
    switch (type) {
        case 'ROLE_DEPOSIT':
            return 'DEPOSITO'
        default:
            return "OUTROS"
    }
}