'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message } from '@/types'

interface Props {
  messages: Message[]
}

// 1. Marquesina en el fondo (Estrellas fugaces)
function ShootingStarsMarquee({ messages }: Props) {
  if (messages.length === 0) return null

  // Repetir mensajes para hacer una cinta larga
  const marqueeMessages = [...messages, ...messages, ...messages, ...messages]

  return (
    <div className="absolute top-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.15] select-none pointer-events-none">
      <motion.div
        className="inline-block"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 40,
        }}
      >
        {marqueeMessages.map((msg, i) => (
          <span key={i} className="mx-10 text-xl font-light tracking-widest text-white">
            {msg.emoji} {msg.message.substring(0, 40)}{msg.message.length > 40 ? '...' : ''} - {msg.name}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// 2. Órbitas (Flotando cerca del centro/contador)
function OrbitingMessages({ messages }: Props) {
  if (messages.length < 2) return null

  // Tomamos hasta 3 mensajes para orbitar
  const orbiters = messages.slice(0, 3)
  
  // Posiciones aproximadas alrededor del contador
  const positions = [
    { top: '45%', left: '15%', delay: 0 },
    { top: '65%', right: '15%', delay: 2 },
    { top: '80%', left: '25%', delay: 1 },
  ]

  return (
    <>
      {orbiters.map((msg, i) => (
        <motion.div
          key={msg.id}
          className="absolute hidden md:flex items-center gap-2 pointer-events-auto cursor-help group"
          style={{ 
            ...(positions[i].left ? { left: positions[i].left } : {}),
            ...(positions[i].right ? { right: positions[i].right } : {}),
            top: positions[i].top 
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: positions[i].delay
          }}
        >
          {/* Burbuja pequeña */}
          <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(201,169,110,0.2)]">
            {msg.photo ? (
              <img src={msg.photo} alt={msg.name} className="w-full h-full object-cover rounded-full opacity-80" />
            ) : (
              msg.emoji
            )}
          </div>
          
          {/* Tooltip en hover */}
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48 p-3 glass rounded-xl text-left left-12 top-0 pointer-events-none z-20">
            <p className="text-white/90 text-xs italic line-clamp-3">"{msg.message}"</p>
            <p className="text-gold/80 text-[10px] mt-2 font-medium tracking-wider uppercase">— {msg.name}</p>
          </div>
        </motion.div>
      ))}
    </>
  )
}

// 3. Constelaciones (Fade in/out aleatorio)
function FadingConstellations({ messages }: Props) {
  const [activeMsg, setActiveMsg] = useState<{ msg: Message; top: string; left: string } | null>(null)

  useEffect(() => {
    if (messages.length === 0) return

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      
      // Coordenadas aleatorias (evitando el centro donde está el contador)
      const isLeftSide = Math.random() > 0.5
      const top = Math.random() * 80 + 10 + '%' // 10% a 90%
      const left = isLeftSide ? Math.random() * 20 + 5 + '%' : Math.random() * 20 + 75 + '%'

      setActiveMsg({ msg: randomMsg, top, left })

      // Ocultar después de 4 segundos
      setTimeout(() => setActiveMsg(null), 4000)
    }, 6000)

    return () => clearInterval(interval)
  }, [messages])

  return (
    <AnimatePresence>
      {activeMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
          transition={{ duration: 1.5 }}
          className="absolute max-w-[200px] pointer-events-none"
          style={{ top: activeMsg.top, left: activeMsg.left }}
        >
          <div className="flex flex-col gap-2">
            <span className="text-2xl opacity-60">{activeMsg.msg.emoji}</span>
            <p className="text-white/30 text-xs font-light italic leading-relaxed">
              "{activeMsg.msg.message.substring(0, 80)}{activeMsg.msg.message.length > 80 ? '...' : ''}"
            </p>
            <p className="text-white/20 text-[10px] tracking-widest uppercase mt-1">
              {activeMsg.msg.name}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function HeroMessagesDecorations({ messages }: Props) {
  if (!messages || messages.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* <ShootingStarsMarquee messages={messages} /> */}
      <OrbitingMessages messages={messages} />
      <FadingConstellations messages={messages} />
    </div>
  )
}
