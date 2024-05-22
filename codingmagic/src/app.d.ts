import type { Session, SupabaseClient, User } from '@supabase/supabase-js'

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {
    // }
    interface PageData {
      supabase: SupabaseClient
      session: Session | null

    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {}