/**
 * Auth Service
 * Serviço de autenticação com Supabase
 */

// TODO: Descomentar quando Supabase estiver configurado
// import { createClient } from '@/lib/supabase/client';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
}

export class AuthService {
  // private supabase = createClient();

  async login(credentials: AuthCredentials) {
    try {
      // TODO: Implementar com Supabase
      // const { data, error } = await this.supabase.auth.signInWithPassword(credentials);
      // if (error) throw error;
      // return data;

      return {
        user: {
          id: '123',
          email: credentials.email,
          name: 'Usuário Teste'
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Falha ao fazer login');
    }
  }

  async register(data: RegisterData) {
    try {
      // TODO: Implementar com Supabase
      // const { data: authData, error } = await this.supabase.auth.signUp({
      //   email: data.email,
      //   password: data.password,
      //   options: {
      //     data: {
      //       name: data.name
      //     }
      //   }
      // });
      // if (error) throw error;
      // return authData;

      return {
        user: {
          id: '123',
          email: data.email,
          name: data.name
        }
      };
    } catch (error) {
      console.error('Register error:', error);
      throw new Error('Falha ao criar conta');
    }
  }

  async logout() {
    try {
      // TODO: Implementar com Supabase
      // const { error } = await this.supabase.auth.signOut();
      // if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Falha ao fazer logout');
    }
  }

  async getCurrentUser() {
    try {
      // TODO: Implementar com Supabase
      // const { data: { user } } = await this.supabase.auth.getUser();
      // return user;
      
      return null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  async resetPassword(email: string) {
    try {
      // TODO: Implementar com Supabase
      // const { error } = await this.supabase.auth.resetPasswordForEmail(email);
      // if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error('Falha ao resetar senha');
    }
  }
}

export const authService = new AuthService();
