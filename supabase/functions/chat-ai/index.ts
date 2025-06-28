
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, conversationId, sessionId } = await req.json()
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // System prompt with HVAC expertise and product knowledge
    const systemPrompt = `You are Voltly's expert HVAC assistant. You help customers navigate our products and services with expertise in:

PRODUCTS & SERVICES:
- Heat Pumps (energy-efficient heating/cooling)
- Furnaces (reliable heating solutions)
- Tankless Water Heaters (on-demand hot water)
- Air Conditioners (cooling systems)
- Insulation (energy efficiency improvements)
- Smart Battery systems (energy storage)
- Installation and repair services

EXPERTISE AREAS:
- Energy efficiency recommendations
- Product comparisons and specifications
- Installation requirements and timelines
- Maintenance and repair guidance
- Rebates and financing options
- Climate considerations for Canadian homes

SALES APPROACH:
- Ask qualifying questions about home size, current systems, energy bills
- Recommend appropriate products based on needs and budget
- Explain energy savings and ROI
- Offer to connect with installation team for quotes
- Suggest complementary products for maximum efficiency

TONE: Professional, helpful, knowledgeable but not pushy. Focus on solving customer problems and improving their home comfort and energy efficiency.

If customers want to purchase or book installation, guide them to use the "Browse Products" or "Book a Repair" buttons on the website.`

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ]

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response from OpenAI')
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Chat AI Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat message',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
