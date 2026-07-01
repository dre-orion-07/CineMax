import { config } from 'dotenv'
import { createServer } from 'http'

config()

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', async () => {
      try {
        const { messages } = JSON.parse(body)

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
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: content }))
      } catch (err) {
        console.error('AI Error:', err.message)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
      }
    })
    return
  }

  res.writeHead(404)
  res.end()
})

server.listen(3001, () => {
  console.log('CineMax AI server running on http://localhost:3001')
})