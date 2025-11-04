// pages/posts/[id].js
"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePostStore } from '@/store/usePostStore'

export default function PostDetail() {
  const { postSelected } = usePostStore()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    if (postSelected) {
      // Simular dados do post
      const mockPost = {
        id: 1,
        title: "Segurança em APIs REST: Guia Completo",
        category: "Tutoriais",
        author: {
          name: "Maria Santos",
          avatar: "/avatar1.jpg",
          bio: "Especialista em segurança de APIs"
        },
        date: "2024-01-15",
        content: `# Segurança em APIs REST
        
        ## Introdução
        
        APIs REST são fundamentais...`,
        image: "/api-security.jpg",
        readTime: "8 min",
        likes: 24
      }
      setPost(mockPost)
      
      const mockComments = [
        {
          id: 1,
          author: "João Silva",
          avatar: "/avatar2.jpg",
          date: "2024-01-16",
          content: "Excelente artigo! Muito bem explicado.",
          likes: 5
        }
      ]
      setComments(mockComments)
    }
  }, [postSelected])

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Você",
        avatar: "/avatar-default.jpg",
        date: "Agora",
        content: newComment,
        likes: 0
      }
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  if (!post) return <div>Carregando...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:w-2/3">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                  <span className="text-gray-500">{post.readTime} de leitura</span>
                </div>

                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                
                <div className="flex items-center space-x-4 mb-8">
                  <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-semibold">{post.author.name}</div>
                    <div className="text-sm text-gray-500">{post.date}</div>
                  </div>
                </div>

                <div className="prose max-w-none mb-8">
                  {post.content}
                </div>

                <div className="flex items-center space-x-6 border-t border-gray-200 pt-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                    <span>👍</span>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                    <span>💬</span>
                    <span>{comments.length}</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Seção de Comentários */}
            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
              <h3 className="text-xl font-semibold mb-6">Comentários ({comments.length})</h3>
              
              <div className="mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Adicione um comentário..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
                />
                <button
                  onClick={handleAddComment}
                  className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Comentar
                </button>
              </div>

              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start space-x-4">
                      <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">{comment.author}</div>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700 mt-2">{comment.content}</p>
                        <button className="text-sm text-gray-500 hover:text-blue-600 mt-2">
                          Curtir ({comment.likes})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Sobre o Autor</h3>
              <div className="flex items-center space-x-4 mb-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full" />
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-gray-600">{post.author.bio}</div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                Seguir
              </button>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Posts Relacionados</h3>
                <div className="space-y-4">
                  <Link href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition">
                    <div className="font-semibold">Autenticação JWT</div>
                    <div className="text-sm text-gray-500">5 min de leitura</div>
                  </Link>
                  <Link href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition">
                    <div className="font-semibold">OWASP Top 10</div>
                    <div className="text-sm text-gray-500">10 min de leitura</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}