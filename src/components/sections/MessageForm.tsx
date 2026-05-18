'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message, EMOJIS, RELATIONS } from '@/types'

// Nombres predeterminados obligatorios según la relación
const FIXED_NAMES: Record<string, string> = {
  'Papá': 'Sebastián',
  // Puedes descomentar y agregar más aquí:
  'Mamá': 'Alejandra',
  // 'Abuelo/a': 'Carlos',
}

interface MessageFormProps {
  onSubmit: (data: Omit<Message, 'id' | 'timestamp' | 'date' | 'time'>) => void
  formRef: React.RefObject<HTMLDivElement>
}

export default function MessageForm({ onSubmit, formRef }: MessageFormProps) {
  const [form, setForm] = useState({
    name: '',
    relation: '',
    message: '',
    city: '',
    country: '',
    emoji: '💛',
    photo: undefined as string | undefined,
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Tu nombre es necesario'
    if (!form.relation) e.relation = 'Cuéntanos tu relación'
    if (!form.message.trim()) e.message = 'Tu mensaje es lo más importante'
    if (form.message.length > 500) e.message = 'Máximo 500 caracteres'
    if (!form.city.trim()) e.city = 'Indícanos tu ciudad'
    return e
  }

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: 'La foto debe ser menor a 3MB' }))
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      setPhotoPreview(result)
      setForm((prev) => ({ ...prev, photo: result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setErrors({})
    onSubmit(form)
    setSubmitted(true)

    // Reset after celebration
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', relation: '', message: '', city: '', country: '', emoji: '💛', photo: undefined })
      setPhotoPreview(null)
    }, 3500)
  }

  const inputClass = 'input-cosmic w-full rounded-xl px-4 py-3 text-sm'

  return (
    <section id="form" className="relative z-10 py-24 px-6">
      <div ref={formRef} className="max-w-2xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <p className="text-white/30 text-xs tracking-widest uppercase mb-4" style={{ letterSpacing: '0.25em' }}>
            Tu luz
          </p>
          <h2 className="font-display text-white/90" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300 }}>
            Deja tu mensaje
          </h2>
          <p className="text-white/35 mt-4 text-base font-light">
            Será parte de su universo para siempre.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-gold rounded-2xl p-12 text-center"
            >
              <div className="text-6xl mb-6 animate-float">✨</div>
              <h3 className="font-display text-3xl text-shimmer mb-3" style={{ fontWeight: 300 }}>
                Tu luz quedó encendida
              </h3>
              <p className="text-white/45 text-base">
                Tu mensaje es ahora parte de su universo. Gracias por ser parte de esta historia.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl p-8 space-y-6"
            >
              {/* Name + Relation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-xs tracking-wider mb-2">Tu nombre *</label>
                  <input
                    className={`${inputClass} ${FIXED_NAMES[form.relation] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Como te llamas"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    maxLength={60}
                    readOnly={!!FIXED_NAMES[form.relation]}
                  />
                  {errors.name && <p className="text-red-400/70 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-white/40 text-xs tracking-wider mb-2">Tu relación *</label>
                  <select
                    className={inputClass}
                    value={form.relation}
                    onChange={(e) => {
                      const relation = e.target.value;
                      setForm((p) => ({
                        ...p,
                        relation,
                        name: FIXED_NAMES[relation] !== undefined ? FIXED_NAMES[relation] : (FIXED_NAMES[p.relation] ? '' : p.name)
                      }))
                    }}
                    style={{ background: 'rgba(255,255,255,0.04)', color: form.relation ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)' }}
                  >
                    <option value="" disabled>¿Quién eres?</option>
                    {RELATIONS.map((r) => (
                      <option key={r} value={r} style={{ background: '#0f1630', color: 'white' }}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.relation && <p className="text-red-400/70 text-xs mt-1">{errors.relation}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-white/40 text-xs tracking-wider mb-2">
                  Tu mensaje *{' '}
                  <span className="text-white/20">({form.message.length}/500)</span>
                </label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={5}
                  placeholder="Escribe lo que llevas en el corazón..."
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  maxLength={500}
                />
                {errors.message && <p className="text-red-400/70 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* City + Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-xs tracking-wider mb-2">Ciudad *</label>
                  <input
                    className={inputClass}
                    placeholder="Lima"
                    value={form.city}
                    onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                  />
                  {errors.city && <p className="text-red-400/70 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-white/40 text-xs tracking-wider mb-2">País</label>
                  <input
                    className={inputClass}
                    placeholder="Perú"
                    value={form.country}
                    onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                  />
                </div>
              </div>

              {/* Emoji picker */}
              <div>
                <label className="block text-white/40 text-xs tracking-wider mb-2">Tu emoji emocional</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setForm((p) => ({ ...p, emoji }))}
                      className="text-xl rounded-xl px-3 py-2 transition-all cursor-pointer"
                      style={{
                        background: form.emoji === emoji ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${form.emoji === emoji ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.06)'}`,
                        transform: form.emoji === emoji ? 'scale(1.15)' : 'scale(1)',
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo upload */}
              <div>
                <label className="block text-white/40 text-xs tracking-wider mb-2">Foto opcional</label>
                <div
                  className="rounded-xl border border-dashed border-white/10 p-6 text-center cursor-pointer transition-all hover:border-white/20"
                  onClick={() => fileRef.current?.click()}
                >
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="preview"
                        className="w-24 h-24 rounded-xl object-cover mx-auto"
                      />
                      <p className="text-white/30 text-xs mt-3">Click para cambiar</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl mb-2">📷</div>
                      <p className="text-white/30 text-sm">Sube una foto bonita (max 3MB)</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhoto}
                />
                {errors.photo && <p className="text-red-400/70 text-xs mt-1">{errors.photo}</p>}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="btn-primary w-full py-4 rounded-xl text-base font-light tracking-wider cursor-pointer"
              >
                Encender mi luz ✨
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
