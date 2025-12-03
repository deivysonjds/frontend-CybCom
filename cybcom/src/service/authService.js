import axios from "axios";
import Cookies from "js-cookie";
const URL_BASE = `${process.env.NEXT_PUBLIC_API}/auth`

export async function signup(data) {
    let res = axios.post(`${URL_BASE}/signup`, data)
        .then((res)=>{
            return true
        }).catch(()=>{
            return false
        })
    
    return res
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