export const config = {
  runtime: 'edge',
}

const TMDB_BASE = 'https://api.themoviedb.org/3'

async function fetchTMDBContext(query: string) {
  try {
    const headers = { Authorization: `Bearer ${process.env.VITE_TMDB_TOKEN}` }

    const [multiRes, trendingRes] = await Promise.all([
      fetch(`${TMDB_BASE}/search/multi?query=${encodeURIComponent(query)}&include_adult=false&page=1`, { headers }),
      fetch(`${TMDB_BASE}/trending/all/week`, { headers }),
    ])

    const [multiData, trendingData] = await Promise.all([
      multiRes.json(),
      trendingRes.json(),
    ])

    const searchResults = (multiData.results || [])
      .filter((r: { media_type: string }) => r.media_type === 'movie' || r.media_type === 'tv')
      .slice(0, 5)
      .map((r: {
        media_type: string
        title?: string
        name?: string
        release_date?: string
        first_air_date?: string
        vote_average?: number
        overview?: string
      }) => ({
        type: r.media_type,
        title: r.title || r.name,
        year: (r.release_date || r.first_air_date || '').slice(0, 4),
        rating: r.vote_average?.toFixed(1),
        overview: r.overview?.slice(0, 150),
      }))

    const trending = (trendingData.results || [])
      .slice(0, 5)
      .map((r: {
        media_type: string
        title?: string
        name?: string
        release_date?: string
        first_air_date?: string
        vote_average?: number
      }) => ({
        type: r.media_type,
        title: r.title || r.name,
        year: (r.release_date || r.first_air_date || '').slice(0, 4),
        rating: r.vote_average?.toFixed(1),
      }))

    return { searchResults, trending }
  } catch {
    return { searchResults: [], trending: [] }
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { messages } = await req.json()
    const lastUserMessage = messages[messages.length - 1]?.content || ''

    const { searchResults, trending } = await fetchTMDBContext(lastUserMessage)

    const tmdbContext = `
CURRENT TMDB DATA FOR THIS QUERY:
Search results for "${lastUserMessage}":
${searchResults.length > 0
  ? searchResults.map((r: { type: string; title: string; year: string; rating: string; overview: string }) =>
      `- [${r.type.toUpperCase()}] ${r.title} (${r.year}) - Rating: ${r.rating}/10 - ${r.overview}`
    ).join('\n')
  : 'No direct matches found.'}

CURRENTLY TRENDING ON TMDB:
${trending.map((r: { type: string; title: string; year: string; rating: string }) =>
  `- [${r.type.toUpperCase()}] ${r.title} (${r.year}) - Rating: ${r.rating}/10`
).join('\n')}
`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: `You are CineMax AI, a knowledgeable movie and TV assistant with access to live TMDB data.
You help users discover movies, TV shows, anime, and Nollywood content.
Always use the TMDB data provided to give accurate, current recommendations.
When recommending content, mention the title, year, rating, and a brief reason why.
If asked about spoilers, warn the user first.
Keep responses concise and engaging.

${tmdbContext}`,
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