// backend/supabaseAdmin.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_KEY;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export default supabaseAdmin;