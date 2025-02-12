import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

export const supabase = createClient<Database>("https://bcvudtikxlbgtqwrktsk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjdnVkdGlreGxiZ3Rxd3JrdHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NDcxODEsImV4cCI6MjA0ODQyMzE4MX0.ly6Gww9EE9cgjLTZsJalLgee51EfNWx23dnzwcU3e30");