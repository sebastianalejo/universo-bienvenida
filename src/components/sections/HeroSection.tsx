'use client'

import { motion } from 'framer-motion'
import { useCountdown } from '@/hooks/useMessages'
import { Message } from '@/types'
import { HeroMessagesDecorations } from '@/components/ui/HeroMessages'

// ⭐ CHANGE THIS DATE to your baby's due date
const DUE_DATE = '2026-07-15T00:00:00'

interface HeroProps {
  messageCount: number
  messages: Message[]
  onScrollToForm: () => void
}

export default function HeroSection({ messageCount, messages, onScrollToForm }: HeroProps) {
  const { days, hours, minutes, seconds } = useCountdown(DUE_DATE)

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10 overflow-hidden">

      {/* Añadimos las decoraciones de mensajes */}
      <HeroMessagesDecorations messages={messages} />


      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-shimmer leading-tight mb-6 mt-8"
        style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 300 }}
      >
        Antes de llegar al mundo,
        <br />
        <em style={{ fontStyle: 'italic' }}>ya eras profundamente amada.</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="text-white/40 max-w-xl mx-auto text-lg font-light leading-relaxed mb-12 text-center"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Cada mensaje aquí es una pequeña luz esperándote.
        <br />
        Un universo construido con amor, solo para ti.
      </motion.p>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="glass rounded-2xl px-8 py-6 mb-12 mx-auto"
        style={{ maxWidth: 500, width: '100%' }}
      >
        <p className="text-white/30 text-xs tracking-widest uppercase mb-4 text-center" style={{ letterSpacing: '0.25em' }}>
          Faltan para conocerte
        </p>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { value: days, label: 'Días' },
            { value: hours, label: 'Horas' },
            { value: minutes, label: 'Minutos' },
            { value: seconds, label: 'Segundos' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center">
              <div
                className="font-display glow-gold"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: '#c9a96e', fontWeight: 300 }}
              >
                {String(value).padStart(2, '0')}
              </div>
              <div className="text-white/30 text-xs mt-1 tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="flex flex-col gap-5 items-center justify-center w-full"
      >
        <button
          onClick={onScrollToForm}
          className="btn-primary px-10 py-4 rounded-full text-base font-light tracking-wider cursor-pointer"
          style={{ letterSpacing: '0.08em' }}
        >
          ✨ Dejar un mensaje
        </button>
        <a
          href="#mural"
          className="text-white/35 text-sm hover:text-white/60 transition-colors cursor-pointer underline underline-offset-4"
          style={{ letterSpacing: '0.06em' }}
        >
          Ver el mural →
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-px h-16 mx-auto"
          style={{
            background: 'linear-gradient(to bottom, rgba(201,169,110,0.4), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
