import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (for API routes only)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnonKey
)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          telegram_chat_id: number | null
          avatar_url: string | null
          created_at: string
        }
      }
      services: {
        Row: {
          id: number
          name: string
          name_ru: string
          description: string | null
          description_ru: string | null
          duration_minutes: number
          price: number
          category: 'lash' | 'brow' | 'combo' | 'tinting'
          is_active: boolean
          sort_order: number
        }
      }
      bookings: {
        Row: {
          id: number
          user_id: string | null
          service_id: number
          slot_id: number
          booked_at: string
          status: 'confirmed' | 'cancelled' | 'completed' | 'pending'
          client_name: string | null
          client_phone: string | null
          notes: string | null
          created_at: string
        }
      }
      available_slots: {
        Row: {
          id: number
          slot_datetime: string
          is_booked: boolean
          created_at: string
        }
      }
      reviews: {
        Row: {
          id: number
          user_id: string | null
          service_id: number | null
          rating: number
          text: string | null
          client_name: string | null
          is_published: boolean
          created_at: string
        }
      }
    }
  }
}
