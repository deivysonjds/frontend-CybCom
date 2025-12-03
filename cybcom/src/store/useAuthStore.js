import { create } from 'zustand'
import Cookies from 'js-cookie'

export const useAuthStore = create((set) => ({
    acessToken: Cookies.get('acessToken') ?? null,
    refreshToken: Cookies.get('refreshToken') ?? null,
    isAuthenticated: false,

    init: () => {
        if (typeof window !== 'undefined') {
            const acessToken = Cookies.get('acessToken') || null
            const refreshToken = Cookies.get('refreshToken') || null
            set({
                acessToken,
                refreshToken,
                isAuthenticated: !!refreshToken,
            })
        }
    },

    loginStore: (tokens) => {
        Cookies.set('acessToken', tokens.acess, { expires: 1, path: '/' })
        Cookies.set('refreshToken', tokens.refresh, { expires: 7, path: '/' })
        set({ isAuthenticated: true, acessToken: tokens.acess, refreshToken: tokens.refresh })
    },
    refreshStore: (token) => {
        Cookies.set('acessToken', token, { expires: 1, path: '/' })
        set({ isAuthenticated: true, acessToken: token })
    },
    logoutStore: () => {
        Cookies.remove('refreshToken')
        Cookies.remove('acessToken')
        set({ isAuthenticated: false, acessToken: null, refreshToken: null })
    },
}))