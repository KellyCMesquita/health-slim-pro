"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { Dumbbell, Plus, Calendar, Clock, Target } from "lucide-react";

interface Treino {
  id: string;
  nome: string;
  descricao: string;
  duracao: number;
  created_at: string;
}

export default function TreinosPage() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTreinos();
  }, []);

  const loadTreinos = async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) return;

      const { data, error } = await supabaseClient
        .from("treinos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar treinos:", error);
      } else {
        setTreinos(data || []);
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
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Meus Treinos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie seus treinos e exercícios
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          Novo Treino
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Dumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total de Treinos
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {treinos.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Concluídos
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Tempo Total
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">0h</p>
        </div>
      </div>

      {/* Treinos List */}
      {treinos.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Nenhum treino cadastrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Comece criando seu primeiro treino
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all shadow-lg">
            <Plus className="w-5 h-5" />
            Criar Primeiro Treino
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treinos.map((treino) => (
            <div
              key={treino.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-lg">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {treino.nome}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {treino.descricao}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {treino.duracao} min
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(treino.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
