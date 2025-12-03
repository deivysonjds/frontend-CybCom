import { create } from 'zustand'
import Cookies from 'js-cookie'

export const usePostStore = create((set) => ({
  postSelected: null,
  posts: [],

  init: () => {
    if (typeof window !== 'undefined') {
      const postSelected = Cookies.get('postSelected') || null
      const postsCookie = Cookies.get('posts')

      set({
        postSelected,
        posts: postsCookie ? JSON.parse(postsCookie) : []
      })
    }
  },

  selectPost: (postId) => {
    Cookies.set('postSelected', postId, { expires: 1, path: '/' })
    set({ postSelected: postId })
  },

  setPosts: (posts) => {
    Cookies.set('posts', JSON.stringify(posts), { expires: 1, path: '/' })
    set({ posts })
  }
}))
