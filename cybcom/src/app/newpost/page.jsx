// pages/create-post.js
"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'

const postSchema = z.object({
  title: z.string().min(10, 'Título deve ter pelo menos 10 caracteres'),
  category: z.string().min(1, 'Selecione uma categoria'),
  excerpt: z.string().min(50, 'Resumo deve ter pelo menos 50 caracteres'),
  content: z.string().min(100, 'Conteúdo deve ter pelo menos 100 caracteres')
})

export default function CreatePost() {
  const [preview, setPreview] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(postSchema)
  })

  const formData = watch()
  const categories = ["Aulas", "Histórias", "Tutoriais", "Ferramentas", "Notícias"]

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/posts', data)
      // Redirecionar para o post criado
    } catch (error) {
      console.error('Erro ao criar post:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Criar Novo Post</h1>
          <button
            onClick={() => setPreview(!preview)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            {preview ? 'Editar' : 'Preview'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Editor */}
          {!preview ? (
            <div className="lg:w-1/2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o título do post..."
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resumo
                  </label>
                  <textarea
                    {...register('excerpt')}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite um resumo do post..."
                  />
                  {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conteúdo
                  </label>
                  <textarea
                    {...register('content')}
                    rows="15"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="Digite o conteúdo do post (suporte a Markdown)..."
                  />
                  {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Publicar Post
                </button>
              </form>
            </div>
          ) : (
            /* Preview */
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">{formData.title || 'Título do Post'}</h2>
                <div className="text-gray-600 mb-4">{formData.excerpt || 'Resumo do post...'}</div>
                <div className="prose max-w-none">
                  {formData.content || 'Conteúdo do post...'}
                </div>
              </div>
            </div>
          )}

          {/* Informações Adicionais */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Dicas para um Bom Post</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Use imagens de qualidade</li>
                <li>• Estruture bem o conteúdo</li>
                <li>• Revise antes de publicar</li>
                <li>• Adicione tags relevantes</li>
              </ul>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Imagem de Capa</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-gray-500">Arraste uma imagem ou clique para selecionar</div>
                  <input type="file" className="hidden" id="cover-image" />
                  <label htmlFor="cover-image" className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                    Selecionar Imagem
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['segurança', 'api', 'rest', 'owasp'].map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}