"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { Apple, Plus, Calendar, Utensils } from "lucide-react";

interface Dieta {
  id: string;
  nome: string;
  descricao: string;
  calorias: number;
  created_at: string;
}

export default function DietasPage() {
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDietas();
  }, []);

  const loadDietas = async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) return;

      const { data, error } = await supabaseClient
        .from("dietas")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar dietas:", error);
      } else {
        setDietas(data || []);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Minhas Dietas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Planeje suas refeições e acompanhe sua nutrição
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          Nova Dieta
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Apple className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total de Dietas
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {dietas.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
              <Utensils className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Refeições Hoje
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Calorias Médias
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {dietas.length > 0
              ? Math.round(
                  dietas.reduce((acc, d) => acc + d.calorias, 0) / dietas.length
                )
              : 0}
          </p>
        </div>
      </div>

      {/* Dietas List */}
      {dietas.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Apple className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Nenhuma dieta cadastrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Comece criando seu primeiro plano alimentar
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all shadow-lg">
            <Plus className="w-5 h-5" />
            Criar Primeira Dieta
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dietas.map((dieta) => (
            <div
              key={dieta.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg">
                  <Apple className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {dieta.nome}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {dieta.descricao}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Utensils className="w-4 h-4" />
                  {dieta.calorias} kcal
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(dieta.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
