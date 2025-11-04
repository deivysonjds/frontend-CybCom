// pages/notifications.js
"use client"
import { useState } from 'react'

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('notifications')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'comment',
      title: 'Novo comentário no seu post',
      message: 'João Silva comentou: "Excelente artigo!"',
      time: '2 min atrás',
      isRead: false
    },
    {
      id: 2,
      type: 'like',
      title: 'Seu post recebeu curtidas',
      message: '5 pessoas curtiram seu post "Introdução ao Pentest"',
      time: '1 hora atrás', 
      isRead: true
    },
    {
      id: 3,
      type: 'follow',
      title: 'Novo seguidor',
      message: 'Maria Oliveira começou a seguir você',
      time: '3 horas atrás',
      isRead: true
    }
  ])

  const [messages] = useState([
    {
      id: 1,
      user: {
        name: "Carlos Santos",
        avatar: "/avatar2.jpg",
        online: true
      },
      lastMessage: "Olá, gostei muito do seu último post!",
      time: "2 min atrás",
      unread: true
    }
  ])

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cabeçalho */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-1 border-b-2 font-semibold ${
                  activeTab === 'notifications' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Notificações
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-4 px-1 border-b-2 font-semibold ${
                  activeTab === 'messages' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Mensagens
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'notifications' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Notificações</h2>
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Marcar todas como lidas
                  </button>
                </div>

                <div className="space-y-4">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.isRead 
                          ? 'bg-white border-gray-200' 
                          : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          notification.isRead ? 'bg-gray-300' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="font-semibold">{notification.title}</div>
                          <div className="text-gray-600 mt-1">{notification.message}</div>
                          <div className="text-sm text-gray-500 mt-2">{notification.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Mensagens</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Lista de Conversas */}
                  <div className="lg:col-span-1">
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div
                          key={message.id}
                          className={`p-4 rounded-lg border cursor-pointer ${
                            message.unread
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img 
                                src={message.user.avatar} 
                                alt={message.user.name}
                                className="w-12 h-12 rounded-full"
                              />
                              {message.user.online && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="font-semibold truncate">{message.user.name}</div>
                                <div className="text-sm text-gray-500">{message.time}</div>
                              </div>
                              <div className="text-gray-600 truncate">{message.lastMessage}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Área de Chat */}
                  <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-lg p-6 h-96 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-4">💬</div>
                        <div>Selecione uma conversa para começar a enviar mensagens</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}