import { createClient } from '@supabase/supabase-js'
    
const supabaseUrl = 'https://qujpdoqunrxxmrjffvic.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1anBkb3F1bnJ4eG1yamZmdmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MTc5NDEsImV4cCI6MjA4MTI5Mzk0MX0.fIJ9WInR9FRzDPmxLOPpCqowHLw78ZrlI_9_4FmxTSU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)