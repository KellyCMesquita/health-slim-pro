"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { Activity, TrendingUp, Calendar, Heart } from "lucide-react";

export default function DashboardPage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
      setUserName(user.user_metadata?.name || "Usuário");
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bem-vindo, {userName}!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe seu progresso e gerencie sua saúde
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
            Treinos
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
            Progresso
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0%</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
            Dias ativos
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
            Saúde
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Ótima</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">
          Comece sua jornada
        </h3>
        <p className="text-blue-100 mb-6">
          Explore as funcionalidades disponíveis no menu lateral para gerenciar seus treinos, dietas e acompanhar seu progresso.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="font-semibold mb-1">Treinos</p>
            <p className="text-sm text-blue-100">Gerencie seus exercícios</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="font-semibold mb-1">Dietas</p>
            <p className="text-sm text-blue-100">Planeje suas refeições</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="font-semibold mb-1">Progresso</p>
            <p className="text-sm text-blue-100">Acompanhe resultados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
