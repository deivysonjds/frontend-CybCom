import { create } from 'zustand'
import Cookies from 'js-cookie'

export const usePostStore = create((set) => ({
    postSelected: null,

    init: () => {
        if (typeof window !== 'undefined') {
            const postSelected = Cookies.get('postSelected') || null
            
            set({
                postSelected
            })
        }
    },

    selectPost: (postId) => {
        Cookies.set('postSelected', postId, { expires: 1, path: '/' })
        set({ postSelected: postId})
    }
}))