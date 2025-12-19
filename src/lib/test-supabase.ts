"use client"

import { supabase } from './supabase'

export async function testSupabaseConnection() {
  console.log('🔍 Testando conexão com Supabase...')
  console.log('📌 URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('📌 ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ Não configurada')

  try {
    // Teste 1: Verificar sessão de autenticação
    console.log('\n🔐 Teste 1: Verificando sessão de autenticação...')
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('❌ Erro ao buscar sessão:', sessionError.message)
    } else {
      console.log('✅ Sessão verificada:', sessionData.session ? 'Usuário logado' : 'Nenhum usuário logado')
    }

    // Teste 2: Fazer select simples em uma tabela
    console.log('\n📊 Teste 2: Testando select na tabela users...')
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id, email')
      .limit(1)
    
    if (usersError) {
      console.error('❌ Erro ao buscar usuários:', usersError.message)
    } else {
      console.log('✅ Select executado com sucesso!')
      console.log('📝 Dados retornados:', usersData)
    }

    // Teste 3: Testar outra tabela (weight_logs)
    console.log('\n⚖️ Teste 3: Testando select na tabela weight_logs...')
    const { data: weightData, error: weightError } = await supabase
      .from('weight_logs')
      .select('*')
      .limit(1)
    
    if (weightError) {
      console.error('❌ Erro ao buscar weight_logs:', weightError.message)
    } else {
      console.log('✅ Select executado com sucesso!')
      console.log('📝 Dados retornados:', weightData)
    }

    console.log('\n✅ Teste de integração concluído!')
    return { success: true }
  } catch (error) {
    console.error('\n❌ Erro geral no teste:', error)
    return { success: false, error }
  }
}
