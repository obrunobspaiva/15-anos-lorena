import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fsgxzuyuogipfytjnlxr.supabase.co'
const SUPABASE_KEY = 'sb_publishable_rTjNjOm9vYiHtR7gE_7wuw_no51jG_v'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
