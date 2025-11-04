import { create } from 'zustand'
import Cookies from 'js-cookie'

export const useAuthStore = create((set) => ({
    acessToken: null,
    refreshToken: null,
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

    login: (tokens) => {
        Cookies.set('acessToken', tokens.acessToken, { expires: 1, path: '/' })
        Cookies.set('refreshToken', tokens.refreshToken, { expires: 7, path: '/' })
        set({ isAuthenticated: true, acessToken: tokens.acessToken, refreshToken: tokens.refreshTokens })
    },
    refresh: (token) => {
        Cookies.set('acessToken', token, { expires: 1, path: '/' })
        set({ isAuthenticated: true, acessToken: token })
    },
    logout: () => {
        Cookies.remove('refreshToken')
        Cookies.remove('acessToken')
        set({ isAuthenticated: false, acessToken: null, refreshToken: null })
    },
}))