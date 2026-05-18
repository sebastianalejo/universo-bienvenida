'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative z-10 py-20 px-6 text-center">
      <div className="divider-gold mb-16 max-w-2xl mx-auto" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <p
          className="font-display text-white/50 leading-relaxed max-w-lg mx-auto"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 300, fontStyle: 'italic' }}
        >
          "Hija, incluso antes de conocerte,
          <br />
          ya estabas cambiando nuestro mundo."
        </p>

        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="w-8 h-px" style={{ background: 'rgba(201,169,110,0.3)' }} />
          <span className="text-white/20 text-xs tracking-widest uppercase" style={{ letterSpacing: '0.2em' }}>
            Universo de Bienvenida
          </span>
          <div className="w-8 h-px" style={{ background: 'rgba(201,169,110,0.3)' }} />
        </div>

        <p className="text-white/15 text-xs mt-6">
          Hecho con amor, antes de que llegues.
        </p>
      </motion.div>
    </footer>
  )
}
