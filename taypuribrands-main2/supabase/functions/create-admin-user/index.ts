import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Simple protection: check for a secret key in the request
    const { secret } = await req.json()
    
    if (secret !== 'aitelier-init-2024') {
      return new Response(
        JSON.stringify({ error: 'Invalid secret key' }),
        { 
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Create admin user
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@aitelier.com',
      password: 'Aitelier@2024',
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    })

    if (userError) {
      // Check if user already exists
      if (userError.message.includes('already registered')) {
        // Get existing user
        const { data: users } = await supabaseAdmin.auth.admin.listUsers()
        const existingUser = users?.users.find(u => u.email === 'admin@aitelier.com')
        
        if (existingUser) {
          // Assign admin role
          const { error: roleError } = await supabaseAdmin
            .from('user_roles')
            .insert({
              user_id: existingUser.id,
              role: 'admin'
            })
            .select()
            .single()

          if (roleError && !roleError.message.includes('duplicate')) {
            throw roleError
          }

          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'Admin user already exists and role assigned',
              user_id: existingUser.id 
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
      }
      throw userError
    }

    // Assign admin role to new user
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: userData.user.id,
        role: 'admin'
      })

    if (roleError && !roleError.message.includes('duplicate')) {
      throw roleError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin user created successfully',
        user_id: userData.user.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
