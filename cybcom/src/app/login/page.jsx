// pages/login.js
"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signinSchema } from '@/schemas/signinSchema'
import { signin } from '@/service/authService'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Login() {
  const router = useRouter()
  const {loginStore} = useAuthStore()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signinSchema)
  })

  const onSubmit = async (data) => {
    
    try {
      const response = signin(data, loginStore)
    } catch (error) {
      alert("Erro: "+error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Entrar</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Continuar com Google
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition">
            <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
            Continuar com GitHub
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Não tem conta?{' '}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  )
}