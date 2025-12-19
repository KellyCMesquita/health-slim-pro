/**
 * Medication Service
 * Serviço para gerenciar medicações
 */

export interface Medication {
  id: string;
  userId: string;
  name: string;
  type: 'ozempic' | 'wegovy' | 'saxenda' | 'mounjaro' | 'other';
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  reminders: boolean;
  createdAt: string;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  takenAt: string;
  dosage: string;
  notes?: string;
  sideEffects?: string[];
}

export interface CreateMedicationData {
  name: string;
  type: Medication['type'];
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  reminders: boolean;
}

export class MedicationService {
  async getMedications(userId: string): Promise<Medication[]> {
    try {
      // TODO: Implementar busca no Supabase
      // const { data, error } = await supabase
      //   .from('medications')
      //   .select('*')
      //   .eq('user_id', userId);
      
      return [
        {
          id: '1',
          userId,
          name: 'Ozempic',
          type: 'ozempic',
          dosage: '0.5mg',
          frequency: 'Semanal',
          startDate: new Date().toISOString(),
          reminders: true,
          createdAt: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Get medications error:', error);
      return [];
    }
  }

  async createMedication(userId: string, data: CreateMedicationData): Promise<Medication> {
    try {
      // TODO: Implementar criação no Supabase
      // const { data: medication, error } = await supabase
      //   .from('medications')
      //   .insert({ ...data, user_id: userId })
      //   .select()
      //   .single();
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        ...data,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Create medication error:', error);
      throw new Error('Falha ao criar medicação');
    }
  }

  async logMedication(medicationId: string, data: Omit<MedicationLog, 'id' | 'medicationId'>): Promise<MedicationLog> {
    try {
      // TODO: Implementar registro no Supabase
      // const { data: log, error } = await supabase
      //   .from('medication_logs')
      //   .insert({ ...data, medication_id: medicationId })
      //   .select()
      //   .single();
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        medicationId,
        ...data
      };
    } catch (error) {
      console.error('Log medication error:', error);
      throw new Error('Falha ao registrar medicação');
    }
  }

  async getMedicationLogs(medicationId: string): Promise<MedicationLog[]> {
    try {
      // TODO: Implementar busca no Supabase
      // const { data, error } = await supabase
      //   .from('medication_logs')
      //   .select('*')
      //   .eq('medication_id', medicationId);
      
      return [];
    } catch (error) {
      console.error('Get medication logs error:', error);
      return [];
    }
  }
}

export const medicationService = new MedicationService();
