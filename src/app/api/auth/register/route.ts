import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se usuário já existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password);

    // Criar usuário
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email,
        password: hashedPassword,
        name: name || null,
        is_premium: false
      })
      .select()
      .single();

    if (error || !newUser) {
      return NextResponse.json(
        { error: 'Erro ao criar usuário' },
        { status: 500 }
      );
    }

    // Gerar token
    const token = generateToken(newUser.id);

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Erro ao criar conta' },
      { status: 500 }
    );
  }
}
