




export const CurrencyToIntegerTransformationInsertToDatabase = (currency: number) => {
    return currency * 100;
}


export const CurrencyToIntegerTransformationGetDatabase = (currency: number) => {
    return (currency).toLocaleString('pt-br', { style: 'currency', minimumFractionDigits: 2, currency: 'BRL' });
}