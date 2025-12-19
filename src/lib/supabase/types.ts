/**
 * Supabase Database Types
 * Tipos TypeScript gerados do schema do Supabase
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          location: string | null
          birth_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string | null
          location?: string | null
          birth_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          location?: string | null
          birth_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      medications: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string
          dosage: string
          frequency: string
          start_date: string
          end_date: string | null
          notes: string | null
          reminders: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: string
          dosage: string
          frequency: string
          start_date: string
          end_date?: string | null
          notes?: string | null
          reminders?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: string
          dosage?: string
          frequency?: string
          start_date?: string
          end_date?: string | null
          notes?: string | null
          reminders?: boolean
          created_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          exercises: Json
          duration: number
          difficulty: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          exercises: Json
          duration: number
          difficulty: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          exercises?: Json
          duration?: number
          difficulty?: string
          category?: string
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: string
          status: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          stripe_subscription_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan: string
          status: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          stripe_subscription_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: string
          status?: string
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          stripe_subscription_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
