import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";

type FailedRequestQueue = {
  onSuccess: (newToken: string) => void
  onFailure: () => void
}

//Cria uma array para salvar essas requests
let failedRequestsQueue: FailedRequestQueue[] = []
//Cria uma variável que irá determinar se já está
//acontecendo um processo de refresh, para não gerar duplicidade
let isRefreshing = false

export function getAPIClient(ctx?: any) {
  const { 'nextauth.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://192.168.0.111:4005/api/v1'
  })

  api.interceptors.request.use(request => {
    const headers = request.headers ?? {}

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    request.headers = headers    
    return request
  })
 

  return api;
}