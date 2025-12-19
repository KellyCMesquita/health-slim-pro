/**
 * Public Landing Page
 * Página inicial pública do aplicativo
 */

import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react';

export default function PublicHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Transforme sua Saúde com
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Inteligência Artificial
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma completa para gerenciar seu tratamento, treinos personalizados e acompanhamento médico profissional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Começar Gratuitamente
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-gray-700 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="IA Personalizada"
            description="Treinos e dietas criados especialmente para você com inteligência artificial avançada"
            gradient="from-yellow-500 to-orange-500"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Seguro e Confiável"
            description="Seus dados protegidos com criptografia de ponta e conformidade com LGPD"
            gradient="from-green-500 to-emerald-500"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Resultados Reais"
            description="Acompanhe seu progresso com métricas detalhadas e gráficos intuitivos"
            gradient="from-blue-500 to-purple-500"
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher nossa plataforma?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <BenefitItem text="Controle completo de medicações e doses" />
            <BenefitItem text="Treinos personalizados por IA" />
            <BenefitItem text="Acompanhamento médico profissional" />
            <BenefitItem text="Gráficos de evolução detalhados" />
            <BenefitItem text="Comunidade de apoio ativa" />
            <BenefitItem text="Suporte 24/7 disponível" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
}
