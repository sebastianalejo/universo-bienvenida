'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message } from '@/types'
import MessageCard from '@/components/ui/MessageCard'

interface MuralSectionProps {
  messages: Message[]
}

const FILTERS = ['Todos', 'Mamá', 'Papá', 'Abuelo/a', 'Tío/a', 'Amigo/a', 'Otro']

export default function MuralSection({ messages }: MuralSectionProps) {
  const [filter, setFilter] = useState('Todos')

  const filtered = filter === 'Todos' ? messages : messages.filter((m) => m.relation === filter)

  return (
    <section id="mural" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="text-white/30 text-xs tracking-widest uppercase mb-4" style={{ letterSpacing: '0.25em' }}>
            El mural
          </p>
          <h2 className="font-display text-white/90" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300 }}>
            Tu universo de amor
          </h2>
          <p className="text-white/35 mt-4 text-base font-light">
            {messages.length} {messages.length === 1 ? 'persona' : 'personas'} ya dejaron su luz para ti
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2 rounded-full text-sm cursor-pointer transition-all"
              style={{
                background: filter === f ? 'rgba(201,169,110,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filter === f ? 'rgba(201,169,110,0.35)' : 'rgba(255,255,255,0.07)'}`,
                color: filter === f ? '#c9a96e' : 'rgba(255,255,255,0.4)',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-5"
          >
            {filtered.map((message, i) => (
              <div key={message.id} className="break-inside-avoid mb-5">
                <MessageCard message={message} index={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-white/25"
          >
            <div className="text-5xl mb-4">🌙</div>
            <p className="font-light">Aún no hay mensajes en esta categoría.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
