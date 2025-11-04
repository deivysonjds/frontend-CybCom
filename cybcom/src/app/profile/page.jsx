// pages/profile.js
"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('posts')
  const [user] = useState({
    name: "Ana Silva",
    email: "ana.silva@email.com",
    avatar: "/avatar1.jpg",
    bio: "Especialista em segurança da informação com foco em pentest e análise de vulnerabilidades.",
    joinDate: "Jan 2023",
    followers: 142,
    following: 86
  })

  const userPosts = [
    {
      id: 1,
      title: "Introdução ao Pentest",
      category: "Aulas",
      date: "2024-01-10",
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: "Análise de Vulnerabilidades Web",
      category: "Tutoriais", 
      date: "2024-01-08",
      likes: 32,
      comments: 8
    }
  ]

  const favorites = [
    {
      id: 3,
      title: "OWASP Top 10 2024",
      author: "Carlos Santos",
      date: "2024-01-12"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header do Perfil */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="md:ml-6 mt-4 md:mt-0 flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600 mt-1">{user.bio}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      <span>Membro desde {user.joinDate}</span>
                      <span>{user.followers} seguidores</span>
                      <span>Seguindo {user.following}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Editar Perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Abas e Conteúdo */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-1 border-b-2 font-semibold ${
                  activeTab === 'posts' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Meus Posts
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`py-4 px-1 border-b-2 font-semibold ${
                  activeTab === 'favorites' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Favoritos
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {userPosts.map(post => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                            {post.category}
                          </span>
                          <span>Publicado em {post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>👍 {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="space-y-6">
                {favorites.map(post => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Por {post.author}</span>
                      <span>•</span>
                      <span>Publicado em {post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}