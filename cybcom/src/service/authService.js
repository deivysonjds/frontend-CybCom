import axios from "axios";
import Cookies from "js-cookie";
const URL_BASE = `${process.env.NEXT_PUBLIC_API}/auth`

export async function signin(data, login){
    axios.post(`${URL_BASE}/signin`,data)
    .then((response)=>{
        login(response.data)
        window.location.href = "/inicio"
    }).catch((response)=>{
        alert(`Erro: ${response}`)
    })
}

export async function logout(){
    let token = Cookies.get("refreshToken")
    axios.post(`${URL_BASE}/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        // A lógica será implementada posteriormente
    }).catch((response)=>{
        // A lógica será implementada posteriormente
    })
}

export async function refresh(){
    let token = Cookies.get("refreshToken")
    axios.post(`${URL_BASE}/refresh`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        // A lógica será implementada posteriormente
    }).catch((response)=>{
        // A lógica será implementada posteriormente
    })
}