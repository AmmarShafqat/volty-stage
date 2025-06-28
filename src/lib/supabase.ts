
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = 'https://aouwyavztvbuiloouylv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvdXd5YXZ6dHZidWlsb291eWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NjA5MjksImV4cCI6MjA2MjEzNjkyOX0.A4a7rw7RjlQwO25Ai9f98J5EoY0Xs9kQ86aYa5uOq40';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
