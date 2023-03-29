import { AuthContext } from "@#/contexts/AuthContext";
import { api } from "@#/services/api";
import { getAPIClient } from "@#/services/axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { type } from "os";
import { useContext } from "react";
import { useQuery } from "react-query";

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  type MercadoPago = {
    id: string,
    transaction_id: string,
    m_id: string,
    m_action: string,
    m_status: string,
    m_status_detail: string,
    m_net_received_amount: string,
    m_total_paid_amount: string,
    m_transaction_id: string,
    m_qr_code: string,
    m_ticket_url: string,
    m_qr_code_base64: string,
    created_at: string,
    updated_at: string
  }

  type Transaction = {
    id: string,
    profile_id: string,
    balance: string,
    bonus: string,
    percentage_bonus: number,
    type_transaction: string,
    mercado_pago_transaction_status: string,
    description?: string,
    is_payment: boolean,
    is_employee_paid: boolean,
    created_at: string,
    updated_at: string,
    MercadoPago: MercadoPago[]
  }

  const { data: transactions } = useQuery<Transaction[]>("/profile", async () => await api.post("transaction"), { cacheTime: 10 })

  transactions

  return (
    <>
      <h1>Hello</h1>
      {transactions?.map(r => {
        <p>{r.balance}</p>
      })}
      {/* {JSON.stringify(transactions, null, 4)} */}
    </>
  )

}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }


  return {
    props: {}
  }
}