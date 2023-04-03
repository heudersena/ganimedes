

export function MoedaBR(money) {
    return Number(money).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}