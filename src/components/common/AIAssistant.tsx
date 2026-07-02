import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_PROMPTS = [
  'Recommend sci-fi movies like Interstellar',
  'Best action movies from the 90s',
  'Family-friendly movies for the weekend',
  'Top rated psychological thrillers',
]

const formatMessage = (content: string) => {
  const lines = content.split('\n').filter((line) => line.trim() !== '')
  return (
    <div className="flex flex-col gap-2">
      {lines.map((line, i) => {
        const trimmed = line.trim()

        if (trimmed.match(/^\d+\.\s/)) {
          return (
            <div key={i} className="flex gap-2">
              <span
                className="font-bold flex-shrink-0"
                style={{ color: 'var(--color-accent-secondary)' }}
              >
                {trimmed.match(/^\d+/)?.[0]}.
              </span>
              <span>{trimmed.replace(/^\d+\.\s/, '')}</span>
            </div>
          )
        }

        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          return (
            <div key={i} className="flex gap-2">
              <span
                className="flex-shrink-0"
                style={{ color: 'var(--color-accent-primary)' }}
              >
                •
              </span>
              <span>{trimmed.replace(/^[-•]\s/, '')}</span>
            </div>
          )
        }

        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return (
            <p key={i} className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {trimmed.replace(/\*\*/g, '')}
            </p>
          )
        }

        return <p key={i}>{trimmed}</p>
      })}
    </div>
  )
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      const data = await response.json()

      if (data.error) throw new Error(data.error)

      setMessages([...updatedMessages, { role: 'assistant', content: data.message }])
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: 'Sorry, I ran into an issue. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = () => sendMessage(input)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-30 flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm cursor-pointer shadow-lg"
        style={{ backgroundColor: 'var(--color-accent-primary)', color: 'white' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <Sparkles size={18} />
        <span className="hidden sm:inline">AI Assistant</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-6 z-30 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              maxHeight: '520px',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                backgroundColor: 'var(--color-accent-primary)',
                color: 'white',
              }}
            >
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <div>
                  <p className="font-semibold text-sm">CineMax AI</p>
                  <p className="text-xs opacity-80">Your movie & TV assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors"
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
              style={{ minHeight: '300px' }}
            >
              {messages.length === 0 && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-accent-primary)' }}
                    >
                      <Bot size={14} color="white" />
                    </div>
                    <div
                      className="px-3 py-2 rounded-2xl rounded-tl-none text-sm"
                      style={{
                        backgroundColor: 'var(--color-bg-card)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Hi! I'm CineMax AI. Ask me anything about movies, TV shows, anime, or Nollywood — powered by live TMDB data!
                    </div>
                  </div>

                  {/* Suggested Prompts */}
                  <div className="flex flex-col gap-2 mt-1">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="text-left text-xs px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                        style={{
                          backgroundColor: 'var(--color-bg-card)',
                          color: 'var(--color-text-secondary)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-accent-primary)' }}
                    >
                      <Bot size={14} color="white" />
                    </div>
                  )}
                  <div
                    className="px-3 py-2 text-sm max-w-[80%]"
                    style={{
                      backgroundColor:
                        msg.role === 'user'
                          ? 'var(--color-accent-primary)'
                          : 'var(--color-bg-card)',
                      color:
                        msg.role === 'user'
                          ? 'white'
                          : 'var(--color-text-primary)',
                      borderRadius:
                        msg.role === 'user'
                          ? '16px 16px 4px 16px'
                          : '16px 16px 16px 4px',
                    }}
                  >
                    {msg.role === 'assistant'
                      ? formatMessage(msg.content)
                      : msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-accent-primary)' }}
                  >
                    <Bot size={14} color="white" />
                  </div>
                  <div
                    className="px-3 py-2 rounded-2xl flex items-center gap-1"
                    style={{ backgroundColor: 'var(--color-bg-card)' }}
                  >
                    <Loader2
                      size={14}
                      className="animate-spin"
                      style={{ color: 'var(--color-text-muted)' }}
                    />
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      Thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-3 flex items-center gap-2"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about movies, TV shows, anime..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--color-text-primary)' }}
                aria-label="Message input"
              />
              <motion.button
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full cursor-pointer transition-colors duration-200"
                style={{
                  backgroundColor:
                    input.trim() && !isLoading
                      ? 'var(--color-accent-primary)'
                      : 'var(--color-bg-card)',
                  color:
                    input.trim() && !isLoading ? 'white' : 'var(--color-text-muted)',
                }}
                aria-label="Send message"
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}