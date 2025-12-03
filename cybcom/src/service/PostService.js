import axios from "axios";
import Cookies from "js-cookie";
const URL_BASE = `${process.env.NEXT_PUBLIC_API}/posts`

export function findAllPosts(){
    let token = Cookies.get('acessToken')
    let posts = axios.get(`${URL_BASE}`,
        {headers: {Authorization: `Bearer ${token}`}},
    ).then((res)=>{
        return res.data
    })

    return posts
}