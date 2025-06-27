// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tjoqyfmzhzrzppsetzay.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqb3F5Zm16aHpyenBwc2V0emF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MDkwMzUsImV4cCI6MjA2NjQ4NTAzNX0.XngFKnyf6dMWf9n6rkUOyKunOu7UDSge7M7lROGnr10';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
