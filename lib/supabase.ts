import { createClient } from '@supabase/supabase-js'

// Hardcoded credentials for Camper Nordest
const supabaseUrl = 'https://ppgbmkjvkymacnzlseyi.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZ2Jta2p2a3ltYWNuemxzZXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzU0NzUsImV4cCI6MjA5MDQ1MTQ3NX0.6jnx0F5Cf3bOt397j__YkwRujTZVWJU-j9elK01omlA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
