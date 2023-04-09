<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full text-center text-sm font-light mb-16">
                        <thead class="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" class="px-6 py-2">R$</th>
                                <th scope="col" class="px-6 py-2">Status</th>
                                <th scope="col" class="px-6 py-2">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="t in transaction" :key="t.id" class="border-b dark:border-neutral-500">
                                <td class="whitespace-nowrap px-6 py-2">{{ moneuBr(t.balance) }}</td>

                                <td class="whitespace-nowrap px-6 py-2">
                                    <!-- {{t.MercadoPago[0].m_ticket_url }} -->
                                    <span v-if="t.mercado_pago_transaction_status === 'pending'">
                                        <a target="_blank" class="text-md text-yellow-500 font-bold"
                                            :href="t.MercadoPago[0]?.m_ticket_url">{{
                                                t.mercado_pago_transaction_status }}</a>
                                    </span>
                                    <span class="text-green-500" v-if="t.mercado_pago_transaction_status === 'approved'">{{
                                        t.mercado_pago_transaction_status }}</span>
                                    <span class="text-red-600" v-if="t.mercado_pago_transaction_status === 'cancelled'">{{
                                        t.MercadoPago[0].m_status }}</span>

                                </td>
                                <td class="whitespace-nowrap px-6 py-2 text-sm">
                                    {{ customTransaction(t.type_transaction) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["transaction"]);


function moneuBr(money) {
    return Number(money).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function customTransaction(transaction) {
    switch (transaction) {
        case "ROLE_DEPOSIT":
            return "DEPOSITO";
        default:
            return "DEFAULT";
    }
}

</script>
