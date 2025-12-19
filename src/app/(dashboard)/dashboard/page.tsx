/**
 * Dashboard Home Page
 * Página principal do dashboard do usuário
 */

"use client";

import { Activity, TrendingUp, Calendar, Heart, Pill, Dumbbell } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Olá, {user?.name || 'Usuário'}! 👋
        </h1>
        <p className="text-blue-100">
          Bem-vindo ao seu painel de controle. Aqui você pode acompanhar todo seu progresso.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Peso Atual"
          value="75.5 kg"
          change="-2.3 kg"
          positive
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          icon={<Pill className="w-6 h-6" />}
          title="Medicações"
          value="3 ativas"
          change="Em dia"
          positive
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          icon={<Dumbbell className="w-6 h-6" />}
          title="Treinos"
          value="12 esta semana"
          change="+3"
          positive
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          icon={<Heart className="w-6 h-6" />}
          title="Saúde Geral"
          value="Excelente"
          change="95%"
          positive
          gradient="from-red-500 to-orange-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <QuickActionCard
          icon={<Calendar className="w-8 h-8" />}
          title="Próxima Consulta"
          description="Agende sua próxima consulta médica"
          action="Agendar"
          gradient="from-blue-500 to-purple-500"
        />
        <QuickActionCard
          icon={<Activity className="w-8 h-8" />}
          title="Novo Treino"
          description="Gere um treino personalizado com IA"
          action="Gerar Treino"
          gradient="from-green-500 to-teal-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h2>
        <div className="space-y-4">
          <ActivityItem
            title="Peso registrado"
            description="75.5 kg - Meta: 70 kg"
            time="Há 2 horas"
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          />
          <ActivityItem
            title="Medicação tomada"
            description="Ozempic 0.5mg"
            time="Há 5 horas"
            icon={<Pill className="w-5 h-5 text-blue-600" />}
          />
          <ActivityItem
            title="Treino concluído"
            description="Cardio - 45 minutos"
            time="Ontem"
            icon={<Dumbbell className="w-5 h-5 text-purple-600" />}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change, positive, gradient }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
      <p className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </p>
    </div>
  );
}

function QuickActionCard({ icon, title, description, action, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105">
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className={`px-6 py-2 bg-gradient-to-r ${gradient} text-white rounded-lg font-semibold hover:shadow-lg transition-all`}>
        {action}
      </button>
    </div>
  );
}

function ActivityItem({ title, description, time, icon }: {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
  );
}
