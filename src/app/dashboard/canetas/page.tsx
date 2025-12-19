"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { Syringe, Plus, Calendar, Package, AlertCircle } from "lucide-react";

interface Caneta {
  id: string;
  nome: string;
  dosagem: string;
  frequencia: string;
  estoque: number;
  data_inicio: string;
  created_at: string;
}

export default function CanetasPage() {
  const [canetas, setCanetas] = useState<Caneta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCanetas();
  }, []);

  const loadCanetas = async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) return;

      const { data, error } = await supabaseClient
        .from("canetas")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar canetas:", error);
      } else {
        setCanetas(data || []);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEstoqueStatus = (estoque: number) => {
    if (estoque === 0) return { color: "red", label: "Sem estoque" };
    if (estoque <= 2) return { color: "yellow", label: "Estoque baixo" };
    return { color: "green", label: "Estoque OK" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Minhas Canetas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie suas canetas e controle de estoque
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          Nova Caneta
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg">
              <Syringe className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total de Canetas
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {canetas.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Em Estoque
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {canetas.filter((c) => c.estoque > 0).length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Estoque Baixo
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {canetas.filter((c) => c.estoque > 0 && c.estoque <= 2).length}
          </p>
        </div>
      </div>

      {/* Canetas List */}
      {canetas.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Syringe className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Nenhuma caneta cadastrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Comece adicionando sua primeira caneta
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-lg transition-all shadow-lg">
            <Plus className="w-5 h-5" />
            Adicionar Primeira Caneta
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canetas.map((caneta) => {
            const status = getEstoqueStatus(caneta.estoque);
            return (
              <div
                key={caneta.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-3 rounded-lg">
                    <Syringe className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      status.color === "green"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : status.color === "yellow"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {status.label}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {caneta.nome}
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>Dosagem: {caneta.dosagem}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Frequência: {caneta.frequencia}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Estoque: {caneta.estoque} unidades</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Início: {new Date(caneta.data_inicio).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
