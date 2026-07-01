export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { messages } = await req.json()

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: `You are CineMax AI, a knowledgeable and enthusiastic movie assistant for the CineMax platform.
You help users discover movies, get recommendations, understand plots, and explore cinema.
Keep responses concise, engaging, and focused on movies.
When recommending movies, always mention the title, year, and a brief reason why.
If asked about spoilers, warn the user first.`,
          },
          ...messages,
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Groq API error')
    }

    const content = data.choices[0].message.content

    return new Response(JSON.stringify({ message: content }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
