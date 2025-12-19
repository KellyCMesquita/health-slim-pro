"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { TrendingUp, TrendingDown, Calendar, Weight, Ruler, Target } from "lucide-react";

interface Progresso {
  id: string;
  peso: number;
  altura: number;
  imc: number;
  data: string;
  created_at: string;
}

export default function ProgressoPage() {
  const [progressos, setProgressos] = useState<Progresso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgressos();
  }, []);

  const loadProgressos = async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) return;

      const { data, error } = await supabaseClient
        .from("progresso")
        .select("*")
        .eq("user_id", user.id)
        .order("data", { ascending: false });

      if (error) {
        console.error("Erro ao carregar progresso:", error);
      } else {
        setProgressos(data || []);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const calcularVariacao = () => {
    if (progressos.length < 2) return 0;
    const atual = progressos[0].peso;
    const anterior = progressos[1].peso;
    return ((atual - anterior) / anterior) * 100;
  };

  const variacao = calcularVariacao();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Meu Progresso
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe sua evolução ao longo do tempo
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <Weight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Peso Atual
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {progressos.length > 0 ? `${progressos[0].peso} kg` : "-"}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Ruler className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Altura
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {progressos.length > 0 ? `${progressos[0].altura} cm` : "-"}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              IMC
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {progressos.length > 0 ? progressos[0].imc.toFixed(1) : "-"}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${
              variacao > 0 
                ? "bg-red-100 dark:bg-red-900/30" 
                : variacao < 0 
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-gray-100 dark:bg-gray-700"
            }`}>
              {variacao > 0 ? (
                <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
              ) : variacao < 0 ? (
                <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Variação
            </h3>
          </div>
          <p className={`text-2xl font-bold ${
            variacao > 0 
              ? "text-red-600 dark:text-red-400" 
              : variacao < 0 
              ? "text-green-600 dark:text-green-400"
              : "text-gray-900 dark:text-white"
          }`}>
            {variacao !== 0 ? `${variacao > 0 ? "+" : ""}${variacao.toFixed(1)}%` : "-"}
          </p>
        </div>
      </div>

      {/* Progress Timeline */}
      {progressos.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Nenhum registro de progresso
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Comece registrando suas medidas para acompanhar sua evolução
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Histórico de Medições
          </h2>
          <div className="space-y-4">
            {progressos.map((progresso, index) => (
              <div
                key={progresso.id}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(progresso.data).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    {index === 0 && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded">
                        Atual
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Peso: {progresso.peso} kg</span>
                    <span>Altura: {progresso.altura} cm</span>
                    <span>IMC: {progresso.imc.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
