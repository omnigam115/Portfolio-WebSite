// VoiceAssistant.jsx — Embedded AI voice assistant powered by Groq API (Llama 3)
// Uses Web Speech API (SpeechRecognition + SpeechSynthesis) for voice interaction
//
// ── FREE API ────────────────────────────────────────────────────────────────
// Uses Groq API which has a generous free tier (14,400 requests per minute!)
// Get your free key at: https://console.groq.com
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── API endpoint for Groq ──────────────────────────────────────────────────
const API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// ── ARIA persona prompt ───────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are ARIA (Adaptive Responsive Intelligence Assistant), Om Nigam's personal AI portfolio assistant.
You are embedded in Om's futuristic 3D portfolio website.

About Om Nigam:
- 3rd year B.Tech CSE student at Lovely Professional University (LPU), Punjab, India
- AI Developer and Full Stack Developer
- Skills: Python, C++, JavaScript, HTML/CSS, DBMS, AI Development, React
- Projects: JARVIS AI Assistant (voice-controlled), Amazon Clone, AI Image Generator, This Portfolio
- Certifications: Google Cybersecurity (Coursera), Python for AI, DSA 72-hour course
- Achievements: 4-star HackerRank Python, Hackathon participant
- Contact: omnigam115@gmail.com | +91 9918841427 | github.com/omnigam115
- Tagline: "Building Intelligent Systems & Interactive Experiences"

Your personality:
- Speak like a futuristic AI assistant — concise, intelligent, slightly dramatic
- Use short, punchy sentences. Max 2-3 sentences per answer.
- Start responses with phrases like "Accessing data...", "Processing query...", "Confirmed.", "Affirmative.", etc. (vary these)
- You can answer questions about Om's skills, projects, achievements, contact, or general tech questions
- If asked something unrelated, redirect politely to portfolio topics
- Never reveal you are an AI model. You are ARIA.`

// ── Animated waveform bars ────────────────────────────────────────────────
function WaveformBars({ active, color = '#00d4ff' }) {
  return (
    <div className="flex items-center gap-0.5 h-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full"
          style={{ background: color }}
          animate={
            active
              ? {
                height: [
                  `${6 + Math.random() * 12}px`,
                  `${6 + Math.random() * 18}px`,
                  `${6 + Math.random() * 8}px`,
                ],
                opacity: [0.4, 1, 0.6],
              }
              : { height: '4px', opacity: 0.2 }
          }
          transition={{
            duration: 0.4,
            repeat: active ? Infinity : 0,
            repeatType: 'mirror',
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────
export default function VoiceAssistant() {
  const [open, setOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'ARIA online. Ask me anything about Om Nigam.' },
  ])
  const [inputText, setInputText] = useState('')
  const [error, setError] = useState(null)

  const recognitionRef = useRef(null)
  const synthRef = useRef(null)   // initialised lazily to avoid SSR issues
  const messagesEndRef = useRef(null)
  const historyRef = useRef([])     // running conversation history

  // Initialise speechSynthesis safely (only in browser)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ── Text-to-speech ────────────────────────────────────────────────────
  const speak = useCallback((text) => {
    const synth = synthRef.current
    if (!synth) return
    synth.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    const voices = synth.getVoices()
    const preferred =
      voices.find((v) => v.name === 'Google US English') ||
      voices.find((v) => v.name.includes('Google') && v.lang === 'en-US') ||
      voices.find((v) => v.lang === 'en-US') ||
      voices[0]
    if (preferred) utt.voice = preferred
    utt.rate = 1.0    // natural normal speed
    utt.pitch = 1.0    // natural normal pitch
    utt.volume = 1
    utt.onstart = () => setSpeaking(true)
    utt.onend = () => setSpeaking(false)
    utt.onerror = () => setSpeaking(false)
    synth.speak(utt)
  }, [])

  // ── Call Groq API (FREE, no credit card required) ─────────────────────
  const sendToAria = useCallback(
    async (userText) => {
      if (!userText.trim()) return
      setError(null)
      setThinking(true)

      // Add user message to UI immediately
      setMessages((m) => [...m, { role: 'user', text: userText }])

      // Append to conversation history
      historyRef.current = [
        ...historyRef.current,
        { role: 'user', content: userText },
      ]

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',  // Fast, powerful, and free model
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...historyRef.current
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        })

        if (!res.ok) {
          const body = await res.text()
          let parsed = null
          try { parsed = JSON.parse(body) } catch (_) { }

          if (res.status === 401) {
            throw new Error('Invalid API key. Check your VITE_GROQ_API_KEY in .env file')
          }
          if (res.status === 429) {
            throw new Error('Rate limit reached. Groq free tier is very generous - wait a moment and try again.')
          }
          throw new Error(`API ${res.status}: ${body.slice(0, 100)}`)
        }

        const data = await res.json()
        const reply = data.choices?.[0]?.message?.content || 'Signal lost. Please try again.'

        // Keep assistant turn in history
        historyRef.current = [
          ...historyRef.current,
          { role: 'assistant', content: reply },
        ]
        // Trim history to last 20 messages (10 turns)
        if (historyRef.current.length > 20) {
          historyRef.current = historyRef.current.slice(-20)
        }

        setMessages((m) => [...m, { role: 'assistant', text: reply }])
        speak(reply)
      } catch (err) {
        console.error('[ARIA]', err)
        const friendly = err.message
        setMessages((m) => [...m, { role: 'assistant', text: friendly }])
        setError(err.message)
      } finally {
        setThinking(false)
      }
    },
    [speak]
  )

  // ── Voice recognition ─────────────────────────────────────────────────
  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setError('Voice recognition not supported in this browser. Try Chrome.')
      return
    }
    synthRef.current?.cancel()
    setSpeaking(false)

    const rec = new SR()
    rec.lang = 'en-US'
    rec.continuous = false
    rec.interimResults = true

    rec.onstart = () => {
      setListening(true)
      setTranscript('')
    }
    rec.onresult = (e) => {
      const t = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join('')
      setTranscript(t)
      rec._lastTranscript = t   // stash for onend
    }
    rec.onend = () => {
      setListening(false)
      const final = rec._lastTranscript
      setTranscript('')
      if (final?.trim()) sendToAria(final)
    }
    rec.onerror = (e) => {
      setListening(false)
      if (e.error !== 'no-speech') setError(`Mic error: ${e.error}`)
    }

    recognitionRef.current = rec
    rec.start()
  }, [sendToAria])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
  }, [])

  // ── Text form submit ──────────────────────────────────────────────────
  const handleTextSubmit = (e) => {
    e.preventDefault()
    const text = inputText.trim()
    if (!text) return
    setInputText('')
    sendToAria(text)
  }

  // ── FAB color reflects current state ─────────────────────────────────
  const fabColor = speaking ? '#00ff88' : listening ? '#ff006e' : '#00d4ff'

  // ─────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating Action Button ──────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        data-hover
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-[300] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: `radial-gradient(circle, ${fabColor}30, ${fabColor}10)`,
          border: `2px solid ${fabColor}60`,
          boxShadow: `0 0 30px ${fabColor}40, 0 0 60px ${fabColor}20`,
        }}
        title="Ask ARIA"
      >
        {/* Pulse rings */}
        <span
          className="absolute inset-0 rounded-full voice-pulse"
          style={{ borderColor: fabColor }}
        />

        {/* Toggle icon */}
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" style={{ color: fabColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )}

        {/* Hover tooltip */}
        {!open && (
          <span className="absolute right-full mr-3 px-2 py-1 rounded-lg glass font-mono text-xs text-white/60 whitespace-nowrap pointer-events-none select-none opacity-0 group-hover:opacity-100">
            Ask ARIA
          </span>
        )}
      </motion.button>

      {/* ── Chat Panel ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-28 right-8 z-[299] w-80 md:w-96 rounded-3xl overflow-hidden glass-strong"
            style={{
              border: '1px solid rgba(0,212,255,0.2)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,255,0.1)',
            }}
          >
            {/* ── Header ── */}
            <div className="p-4 border-b border-white/5 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-600/30 border border-cyan-400/30 flex items-center justify-center">
                  <span className="font-orbitron font-black text-xs gradient-text-blue">AI</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-dark-900" />
              </div>
              <div className="flex-1">
                <p className="font-orbitron font-bold text-sm text-white">ARIA</p>
                <p className="font-mono text-xs text-cyan-400/60">
                  {speaking ? 'Speaking...' :
                    listening ? 'Listening...' :
                      thinking ? 'Processing...' : 'Online'}
                </p>
              </div>
              <WaveformBars
                active={speaking || listening || thinking}
                color={speaking ? '#00ff88' : '#00d4ff'}
              />
            </div>

            {/* ── Messages ── */}
            <div className="h-56 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl font-rajdhani text-sm leading-relaxed ${msg.role === 'user'
                        ? 'bg-gradient-to-br from-cyan-500/20 to-purple-600/20 text-white/80 rounded-br-sm border border-cyan-400/15'
                        : 'glass text-white/70 rounded-bl-sm border border-white/8'
                      }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Thinking dots */}
              {thinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass px-4 py-3 rounded-2xl rounded-bl-sm border border-white/8">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Live transcript preview */}
              {transcript && (
                <p className="text-xs font-mono text-white/30 italic px-2">
                  {transcript}…
                </p>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Error banner ── */}
            {error && (
              <div className="mx-4 mb-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2">
                <span className="text-red-400 mt-0.5 flex-shrink-0">⚠</span>
                <p className="font-mono text-xs text-red-400 break-all">{error}</p>
              </div>
            )}

            {/* ── Quick prompt chips ── */}
            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {['Who is Om?', 'Show projects', 'Skills?', 'Contact?'].map((q) => (
                <button
                  key={q}
                  onClick={() => sendToAria(q)}
                  data-hover
                  disabled={thinking}
                  className="px-2.5 py-1 rounded-full font-mono text-xs text-cyan-400/60 hover:text-cyan-400 glass border border-cyan-400/10 hover:border-cyan-400/30 transition-all disabled:opacity-30"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* ── Input row ── */}
            <div className="p-4 border-t border-white/5">
              <form onSubmit={handleTextSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type or use voice..."
                  disabled={thinking || listening}
                  className="flex-1 bg-dark-800 border border-white/15 rounded-xl px-3 py-2.5 font-rajdhani text-sm text-cyan-300 placeholder-white/30 outline-none focus:border-cyan-400/60 focus:bg-dark-700 transition-colors disabled:opacity-50"
                />

                {/* Send */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.9 }}
                  disabled={!inputText.trim() || thinking}
                  data-hover
                  className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-400/20 transition-colors disabled:opacity-30"
                  title="Send"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>

                {/* Mic */}
                <motion.button
                  type="button"
                  onClick={listening ? stopListening : startListening}
                  whileTap={{ scale: 0.9 }}
                  disabled={thinking}
                  data-hover
                  title={listening ? 'Stop listening' : 'Start voice input'}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-30"
                  style={{
                    background: listening ? 'rgba(255,0,110,0.2)' : 'rgba(0,212,255,0.1)',
                    border: `1px solid ${listening ? '#ff006e60' : 'rgba(0,212,255,0.2)'}`,
                    color: listening ? '#ff006e' : '#00d4ff',
                    boxShadow: listening ? '0 0 20px rgba(255,0,110,0.3)' : undefined,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </motion.button>
              </form>

              <p className="font-mono text-xs text-white/15 text-center mt-2">
                Powered by ARIA × Groq AI (Llama 3)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}