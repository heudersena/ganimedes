import api from "./axios";

export async function getAllTransactions() {
    return await (await api.post("transaction")).data
}