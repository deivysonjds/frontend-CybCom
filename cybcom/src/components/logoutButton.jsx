import { logout } from "@/service/authService"
import { useAuthStore } from "@/store/useAuthStore"

export default function LogoutButton(){
    const { logoutStore } = useAuthStore()

    const onClickLogout = async () => {
        let res = await logout(logoutStore)
        window.location.href = '/'
    }

    return (
        <img
            className="cursor-pointer w-10"
            onClick={onClickLogout}
            src="/logout.png"
            alt="botão de deslogar"
        />
    )
}
