/**
 * User Service
 * Serviço para gerenciar dados de usuários
 */

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  birthDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  location?: string;
  birthDate?: string;
}

export class UserService {
  async getUser(userId: string): Promise<User | null> {
    try {
      // TODO: Implementar busca no Supabase
      // const { data, error } = await supabase
      //   .from('users')
      //   .select('*')
      //   .eq('id', userId)
      //   .single();
      
      return {
        id: userId,
        email: 'user@example.com',
        name: 'Usuário Teste',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  async updateUser(userId: string, data: UpdateUserData): Promise<User> {
    try {
      // TODO: Implementar atualização no Supabase
      // const { data: updated, error } = await supabase
      //   .from('users')
      //   .update(data)
      //   .eq('id', userId)
      //   .select()
      //   .single();
      
      return {
        id: userId,
        email: 'user@example.com',
        name: data.name || 'Usuário Teste',
        phone: data.phone,
        location: data.location,
        birthDate: data.birthDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Update user error:', error);
      throw new Error('Falha ao atualizar usuário');
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      // TODO: Implementar deleção no Supabase
      // const { error } = await supabase
      //   .from('users')
      //   .delete()
      //   .eq('id', userId);
      
      console.log('User deleted:', userId);
    } catch (error) {
      console.error('Delete user error:', error);
      throw new Error('Falha ao deletar usuário');
    }
  }
}

export const userService = new UserService();
