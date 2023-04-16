function BR(moeda) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
        Number(moeda)
    );
}

export { BR }