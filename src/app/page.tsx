"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Heart, LogIn, UserPlus, Activity, TrendingUp, Shield } from "lucide-react";
import { testSupabaseConnection } from "@/lib/test-supabase";

export default function HomePage() {
  useEffect(() => {
    // Executar teste de integração ao carregar a página
    testSupabaseConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-2xl">
              <Heart className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Health Slim Pro
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
              Seu Assistente de Emagrecimento
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Plataforma completa para usuários de canetas emagrecedoras como Ozempic, Wegovy, Saxenda e Mounjaro
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/register"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              <UserPlus className="w-5 h-5" />
              Criar conta grátis
            </Link>
            <Link
              href="/login"
              className="group flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700"
            >
              <LogIn className="w-5 h-5" />
              Já tenho conta
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-fit mb-4">
                <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Acompanhamento Completo
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitore seu progresso, medicação e sintomas em um só lugar
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg w-fit mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Resultados Reais
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize sua evolução com gráficos e relatórios detalhados
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg w-fit mb-4">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Seguro e Privado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Seus dados protegidos com autenticação segura via Supabase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
