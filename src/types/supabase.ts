
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
      customers: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
          city: string
          state: string
          zip_code: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
          city: string
          state: string
          zip_code: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          status: string
          total_amount: number
          tax_amount: number
          has_extended_warranty: boolean
          extended_warranty_price: number
          created_at: string
          updated_at: string
          address: string
          city: string
          state: string
          zip_code: string
          installation_date: string | null
          installation_time_slot: string | null
          is_priority_installation: boolean
        }
        Insert: {
          id?: string
          customer_id: string
          status: string
          total_amount: number
          tax_amount: number
          has_extended_warranty: boolean
          extended_warranty_price: number
          created_at?: string
          updated_at?: string
          address: string
          city: string
          state: string
          zip_code: string
          installation_date?: string | null
          installation_time_slot?: string | null
          is_priority_installation?: boolean
        }
        Update: {
          id?: string
          customer_id?: string
          status?: string
          total_amount?: number
          tax_amount?: number
          has_extended_warranty?: boolean
          extended_warranty_price?: number
          created_at?: string
          updated_at?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          installation_date?: string | null
          installation_time_slot?: string | null
          is_priority_installation?: boolean
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: number
          product_name: string
          quantity: number
          unit_price: number
          extended_warranty: boolean
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: number
          product_name: string
          quantity: number
          unit_price: number
          extended_warranty: boolean
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: number
          product_name?: string
          quantity?: number
          unit_price?: number
          extended_warranty?: boolean
          created_at?: string
        }
      }
    }
  }
}
