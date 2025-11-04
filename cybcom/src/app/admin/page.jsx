// pages/admin/dashboard.js
"use client"
import { useState } from 'react'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [users] = useState([
    { id: 1, name: "Ana Silva", email: "ana@email.com", role: "user", status: "active", joinDate: "2023-01-15" },
    { id: 2, name: "Carlos Santos", email: "carlos@email.com", role: "admin", status: "active", joinDate: "2023-01-10" }
  ])
  const [posts] = useState([
    { id: 1, title: "Introdução ao Pentest", author: "Ana Silva", status: "published", date: "2024-01-15", views: 142 },
    { id: 2, title: "Segurança em APIs", author: "Carlos Santos", status: "draft", date: "2024-01-14", views: 0 }
  ])

  const stats = {
    totalUsers: 1242,
    totalPosts: 456,
    pendingModeration: 3,
    reports: 12
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Painel Admin</h2>
          </div>
          <nav className="p-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'users', label: 'Usuários', icon: '👥' },
              { id: 'posts', label: 'Posts', icon: '📝' },
              { id: 'categories', label: 'Categorias', icon: '🏷️' },
              { id: 'reports', label: 'Reports', icon: '🚨' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                  activeSection === item.id 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 p-8">
          {activeSection === 'dashboard' && (
            <>
              <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
              
              {/* Cards Estatísticos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
                  <div className="text-gray-600">Total de Usuários</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-2xl font-bold text-green-600">{stats.totalPosts}</div>
                  <div className="text-gray-600">Posts Publicados</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-2xl font-bold text-yellow-600">{stats.pendingModeration}</div>
                  <div className="text-gray-600">Aguardando Moderação</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-2xl font-bold text-red-600">{stats.reports}</div>
                  <div className="text-gray-600">Reports</div>
                </div>
              </div>

              {/* Atividade Recente */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Atividade Recente</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>Novo usuário registrado</div>
                    <div className="text-sm text-gray-500">2 min atrás</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>Novo post publicado</div>
                    <div className="text-sm text-gray-500">15 min atrás</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'users' && (
            <>
              <h1 className="text-3xl font-bold mb-8">Gerenciar Usuários</h1>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Usuário</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id}>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Editar</button>
                          <button className="text-red-600 hover:text-red-800">Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeSection === 'posts' && (
            <>
              <h1 className="text-3xl font-bold mb-8">Gerenciar Posts</h1>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Título</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Autor</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {posts.map(post => (
                      <tr key={post.id}>
                        <td className="px-6 py-4">{post.title}</td>
                        <td className="px-6 py-4">{post.author}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{post.date}</td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Editar</button>
                          <button className="text-red-600 hover:text-red-800">Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}