import axios from "axios";
import Cookies from "js-cookie";
const URL_BASE = `${process.env.NEXT_PUBLIC_API}/auth`

import {jwtDecode} from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp && decoded.exp < currentTime;
    
  } catch (e) {
    return false;
  }
}

export async function signin(data, login){
    axios.post(`${URL_BASE}/signin`,data)
    .then((response)=>{
        login(response.data)
        window.location.href = "/feed"
    }).catch((response)=>{
        alert(`Erro: ${response.message}`)
    })
}

export async function logout(logoutStore) {
    const token = Cookies.get("refreshToken")
    try {
        const response = await axios.post(
            `${URL_BASE}/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        logoutStore()
        return response.status

    } catch (err) {
        logoutStore()
        return null
    }
}


export async function refresh(){
    let token = Cookies.get("refreshToken")
    axios.post(`${URL_BASE}/refresh`,
        {}, 
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        // A lógica será implementada posteriormente
    }).catch((response)=>{
        // A lógica será implementada posteriormente
    })
}