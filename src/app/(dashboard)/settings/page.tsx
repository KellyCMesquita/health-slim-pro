/**
 * Settings Page
 * Página de configurações do usuário
 */

"use client";

import { Bell, Lock, Globe, Moon, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Configurações</h1>

      {/* Notifications */}
      <SettingsSection
        icon={<Bell className="w-6 h-6" />}
        title="Notificações"
        description="Gerencie suas preferências de notificação"
      >
        <SettingToggle
          label="Notificações por email"
          description="Receba atualizações importantes por email"
          defaultChecked
        />
        <SettingToggle
          label="Lembretes de medicação"
          description="Receba lembretes para tomar suas medicações"
          defaultChecked
        />
        <SettingToggle
          label="Relatórios semanais"
          description="Receba um resumo semanal do seu progresso"
        />
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection
        icon={<Shield className="w-6 h-6" />}
        title="Privacidade"
        description="Controle quem pode ver suas informações"
      >
        <SettingToggle
          label="Perfil público"
          description="Permitir que outros usuários vejam seu perfil"
        />
        <SettingToggle
          label="Mostrar progresso"
          description="Compartilhar seu progresso com a comunidade"
          defaultChecked
        />
      </SettingsSection>

      {/* Security */}
      <SettingsSection
        icon={<Lock className="w-6 h-6" />}
        title="Segurança"
        description="Mantenha sua conta segura"
      >
        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="font-medium text-gray-900">Alterar senha</div>
          <div className="text-sm text-gray-600">Última alteração há 3 meses</div>
        </button>
        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="font-medium text-gray-900">Autenticação de dois fatores</div>
          <div className="text-sm text-gray-600">Adicione uma camada extra de segurança</div>
        </button>
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection
        icon={<Moon className="w-6 h-6" />}
        title="Aparência"
        description="Personalize a interface"
      >
        <SettingToggle
          label="Modo escuro"
          description="Ativar tema escuro"
        />
      </SettingsSection>

      {/* Language */}
      <SettingsSection
        icon={<Globe className="w-6 h-6" />}
        title="Idioma"
        description="Escolha seu idioma preferido"
      >
        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Português (Brasil)</option>
          <option>English (US)</option>
          <option>Español</option>
        </select>
      </SettingsSection>

      {/* Subscription */}
      <SettingsSection
        icon={<CreditCard className="w-6 h-6" />}
        title="Assinatura"
        description="Gerencie seu plano"
      >
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">Plano Gratuito</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Ativo
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Faça upgrade para desbloquear recursos premium
          </p>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            Ver Planos
          </button>
        </div>
      </SettingsSection>
    </div>
  );
}

function SettingsSection({ icon, title, description, children }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SettingToggle({ label, description, defaultChecked = false }: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </label>
  );
}
