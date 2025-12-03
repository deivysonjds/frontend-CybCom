// pages/posts/index.js
"use client"
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { usePostStore } from '@/store/usePostStore'
import LogoutButton from '@/components/logoutButton'
import ProfileButton from '@/components/profileButton'
import Cookies from 'js-cookie'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [categories, setCategories] = useState([])
  const { register, watch } = useForm()
  const {selectPost} = usePostStore()

  const searchTerm = watch('search', '')
  const selectedCategory = watch('category', '')

  const onSelectPost = (postId)=>{
    selectPost(postId)
  }

  useEffect(() => {
    console.log('token:' + Cookies.get('acessToken'));
    console.log('token:' + Cookies.get('refreshToken'));
    
    const mockPosts = [
      {
        id: 1,
        title: "Segurança em APIs REST",
        category: "Tutoriais",
        author: "Maria Santos",
        date: "2024-01-15",
        excerpt: "Aprenda a proteger suas APIs contra vulnerabilidades comuns...",
        image: "/api-security.jpg",
        readTime: "8 min"
      },
      {
        id: 2,
        title: "Segurança em APIs REST",
        category: "Tutoriais",
        author: "Maria Santos",
        date: "2024-01-15",
        excerpt: "Aprenda a proteger suas APIs contra vulnerabilidades comuns...",
        image: "/api-security.jpg",
        readTime: "8 min"
      },
      {
        id: 3,
        title: "Segurança em APIs REST",
        category: "Tutoriais",
        author: "Maria Santos",
        date: "2024-01-15",
        excerpt: "Aprenda a proteger suas APIs contra vulnerabilidades comuns...",
        image: "/api-security.jpg",
        readTime: "8 min"
      }
      // Mais posts...
    ]
    setPosts(mockPosts)
    setFilteredPosts(mockPosts)
    setCategories(["Aulas", "Histórias", "Tutoriais", "Ferramentas", "Notícias"])
  }, [])

  useEffect(() => {
    let filtered = posts
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }
    
    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, posts])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Filtros</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    {...register('category')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="space-y-2">
                    {['OWASP', 'Criptografia', 'Pentest', 'Firewall'].map(tag => (
                      <label key={tag} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                        <span className="ml-2 text-sm text-gray-600">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Área Principal */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="flex-1">
                <input
                  {...register('search')}
                  type="text"
                  placeholder="Buscar posts..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Link 
                href="/create-post"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition whitespace-nowrap"
              >
                Criar Post
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <Link
                        onClick={()=> onSelectPost(post.id)}
                        href={`/post`}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Ler mais
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-5 items-center sticky justify-start'>
              <ProfileButton />
              <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}