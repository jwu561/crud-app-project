import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL;
// console.log('URL:', URL); // This should print the exact URL

const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
// console.log('API_KEY:', API_KEY); // This should print the API key

// console.log('Environment Variables:', import.meta.env);

const supabase = createClient(URL, API_KEY);

export default supabase;