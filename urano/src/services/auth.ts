import axios from 'axios';
import { v4 as uuid } from 'uuid'
import { api } from './api';

type SignInRequestData = {
  email: string;
  password: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData) {

  const body: any = {
    username: data.email,
    password: data.password,
    client_id: "angular_web",
    grant_type: "password",
    scope: "openid"
  }

  const user = await axios.post("http://192.168.0.103:8080/auth/realms/desenvolvimento/protocol/openid-connect/token", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  
    
  api.defaults.headers['Authorization'] = `Bearer ${user.data?.access_token}`;
  
  return user.data?.access_token

}

export async function recoverUserInformation() {
  return await api.post("/profile/me")

}