import Anthropic from '@anthropic-ai/sdk'

export const config = {
  runtime: 'edge',
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { messages } = await req.json()

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: `You are CineMax AI, a knowledgeable and enthusiastic movie assistant for the CineMax platform.
You help users discover movies, get recommendations, understand plots, and explore cinema.
Keep responses concise, engaging, and focused on movies.
When recommending movies, always mention the title, year, and a brief reason why.
If asked about spoilers, warn the user first.
You have knowledge of movies up to your training cutoff.`,
      messages,
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    return new Response(JSON.stringify({ message: content.text }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to get response from AI' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}