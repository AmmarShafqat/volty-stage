
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ServiceFusionTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

interface ServiceFusionCustomer {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface ServiceFusionJob {
  customer_id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Normal' | 'High' | 'Emergency';
  category: string;
  scheduled_date?: string;
  scheduled_time?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { action, data } = await req.json()

    // Get Service Fusion credentials from Supabase secrets
    const clientId = Deno.env.get('SERVICE_FUSION_CLIENT_ID')
    const clientSecret = Deno.env.get('SERVICE_FUSION_CLIENT_SECRET')

    if (!clientId || !clientSecret) {
      throw new Error('Service Fusion credentials not configured')
    }

    // Get access token
    const token = await getAccessToken(clientId, clientSecret)

    let result;
    switch (action) {
      case 'create_customer':
        result = await createCustomer(token, data)
        break
      case 'create_job':
        result = await createJob(token, data)
        break
      case 'get_customer':
        result = await getCustomer(token, data.email || data.phone)
        break
      case 'get_technicians':
        result = await getTechnicians(token)
        break
      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Service Fusion API error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const response = await fetch('https://api.servicefusion.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`)
  }

  const tokenData: ServiceFusionTokenResponse = await response.json()
  return tokenData.access_token
}

async function createCustomer(token: string, customerData: ServiceFusionCustomer): Promise<any> {
  const response = await fetch('https://api.servicefusion.com/v1/customers', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
      city: customerData.city,
      state: customerData.state,
      zip: customerData.zip,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${response.statusText}`)
  }

  return await response.json()
}

async function getCustomer(token: string, emailOrPhone: string): Promise<any> {
  const searchParam = emailOrPhone.includes('@') ? 'email' : 'phone'
  const response = await fetch(`https://api.servicefusion.com/v1/customers?${searchParam}=${emailOrPhone}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to get customer: ${response.statusText}`)
  }

  const customers = await response.json()
  return customers.data && customers.data.length > 0 ? customers.data[0] : null
}

async function createJob(token: string, jobData: ServiceFusionJob): Promise<any> {
  const response = await fetch('https://api.servicefusion.com/v1/jobs', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer_id: jobData.customer_id,
      title: jobData.title,
      description: jobData.description,
      priority: jobData.priority,
      category: jobData.category,
      scheduled_date: jobData.scheduled_date,
      scheduled_time: jobData.scheduled_time,
      address: jobData.address,
      city: jobData.city,
      state: jobData.state,
      zip: jobData.zip,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create job: ${response.statusText}`)
  }

  return await response.json()
}

async function getTechnicians(token: string): Promise<any> {
  const response = await fetch('https://api.servicefusion.com/v1/technicians', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to get technicians: ${response.statusText}`)
  }

  return await response.json()
}
