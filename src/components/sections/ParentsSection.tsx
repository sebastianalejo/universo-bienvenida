'use client'

import { motion } from 'framer-motion'

export default function ParentsSection() {
  return (
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass rounded-3xl p-8 md:p-12 flex flex-col items-center gap-8"
        >
          {/* Photo */}
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="absolute inset-0 rounded-2xl blur-xl bg-[#c9a96e] opacity-10"></div>
            <img
              src="/images/padres.png"
              alt="Sebastián y Alejandra"
              className="relative w-full h-auto rounded-2xl border border-[#c9a96e]/20 shadow-[0_0_30px_rgba(201,169,110,0.1)]"
            />
          </div>

          {/* Text */}
          <div className="text-center max-w-2xl">
            <p className="text-white/30 text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: '0.25em' }}>
              Tus papás
            </p>
            <h2 className="font-display text-shimmer mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 300 }}>
              Te esperamos con todo el amor del mundo
            </h2>
            <p className="text-white/50 text-base font-light leading-relaxed">
              Hola mi amor, somos tus papás, Sebastián y Alejandra. 
              Estamos contando los días para conocerte y llenarte de abrazos. 
              Este universo de mensajes es para que veas, desde antes de nacer, 
              lo mucho que ya eres amada por todos nosotros.
            </p>
            <div className="mt-4 text-[#c9a96e] text-sm font-light">
              — Papá y Mamá ✨
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
