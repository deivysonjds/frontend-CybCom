"use client"
import Head from 'next/head'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { useEffect, useState } from 'react'

export default function Home() {
    const { refreshToken } = useAuthStore()
    const [isLogged, setIsLogged] = useState(false)
    const recentPosts = [
    {
      id: 1,
      title: "Introdução à Criptografia Moderna",
      category: "Aulas",
      author: "Ana Silva",
      date: "2024-01-15",
      excerpt: "Aprenda os fundamentos da criptografia aplicada...",
      image: "/post1.jpg"
    },
    {
      id: 2,
      title: "Como Proteger Suas APIs",
      category: "Tutoriais", 
      author: "Carlos Santos",
      date: "2024-01-14",
      excerpt: "Guia completo para segurança em APIs REST...",
      image: "/post2.jpg"
    }
  ]

  useEffect(()=>{
    setIsLogged(!!refreshToken)
  },[refreshToken])

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>CyberComunidade - Início</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Aprenda, compartilhe e evolua na cibersegurança
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Junte-se à maior comunidade de segurança digital do Brasil
          </p>
          {!isLogged ? (
            <Link href="/login" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Entrar na Comunidade
            </Link>
          ) : (
            <Link href="/feed" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Ver Posts Recentes
            </Link>
          )}
        </div>
      </section>

      {/* Estatísticas */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">1.2k+</div>
              <div className="text-gray-600">Membros</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">450+</div>
              <div className="text-gray-600">Posts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Tutoriais</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">25+</div>
              <div className="text-gray-600">Especialistas</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}