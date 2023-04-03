

export function StatusTransaction(values) {
    switch (values) {
        case 'pending':
            return 'PENDENTE'
        case 'cancelled':
            return 'CANCELADO'
        case 'approved':
            return 'APROVADO'
        default:
            return "OUTROS"
    }
}