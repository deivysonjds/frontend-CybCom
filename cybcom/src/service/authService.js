import axios from "axios";
import Cookies from "js-cookie";
const URL_BASE = `${process.env.NEXT_PUBLIC_API}/auth`

import { jwtDecode } from "jwt-decode";

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

export async function signin(data, login) {
    axios.post(`${URL_BASE}/signin`, data)
        .then((response) => {
            login(response.data)
            window.location.href = "/feed"
        }).catch((response) => {
            alert(`Erro: ${response.message}`)
        })
}

export async function logout(logoutStore) {
    const token = Cookies.get("refreshToken")
        const response = await axios.post(
            `${URL_BASE}/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(()=>{
            logoutStore()
            return response.status
        }).catch(()=>{
            logoutStore()
            return null
        })


}

export async function validate(token) {
    
    
    let res = await axios.post(`${URL_BASE}/validate`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).then((res)=>{
        return true
    }).catch(()=>{
        return false
    })

    return res
}


export async function refresh(token) {
    let res = await axios.post(`${URL_BASE}/refresh`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).then((response) => {
        return response.data
    }).catch((response) => {
        throw new Error('Refresh não realizado')
    })

    return res.acess
}