// pages/about.js
export default function About() {
  const team = [
    {
      name: "Ana Silva",
      role: "Fundadora & Especialista em Segurança",
      bio: "10+ anos de experiência em segurança corporativa",
      avatar: "/team1.jpg"
    },
    {
      name: "Carlos Santos", 
      role: "Head de Conteúdo",
      bio: "Especialista em educação em cybersegurança",
      avatar: "/team2.jpg"
    },
    {
      name: "Mariana Oliveira",
      role: "Community Manager",
      bio: "Dedicada a construir comunidades engajadas",
      avatar: "/team3.jpg"
    }
  ]

  const values = [
    {
      icon: "🎓",
      title: "Educação",
      description: "Acreditamos no poder do conhecimento compartilhado"
    },
    {
      icon: "🤝",
      title: "Colaboração", 
      description: "Juntos somos mais fortes contra as ameaças digitais"
    },
    {
      icon: "⚖️",
      title: "Ética",
      description: "Comprometidos com práticas éticas e responsáveis"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Sobre Nós</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Construindo a maior comunidade de cybersegurança do Brasil, 
            onde conhecimento e colaboração se encontram.
          </p>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
            <p className="text-lg text-gray-600 mb-6">
              Democratizar o acesso ao conhecimento em cybersegurança, 
              criando um espaço seguro para aprendizado, compartilhamento 
              e crescimento profissional.
            </p>
            <p className="text-lg text-gray-600">
              Acreditamos que a segurança digital é um direito de todos e 
              trabalhamos para tornar o Brasil um país mais seguro no ambiente digital.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Números da Comunidade</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1.2k+</div>
                <div className="text-gray-600">Membros</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">450+</div>
                <div className="text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600">Tutoriais</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">25+</div>
                <div className="text-gray-600">Especialistas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Time */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nosso Time</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <img 
                src={member.avatar} 
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <div className="text-blue-600 font-semibold mb-2">{member.role}</div>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}