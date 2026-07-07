'use client'

import { motion } from 'framer-motion'
import { Message } from '@/types'

function getEmbedUrl(url: string) {
  if (!url) return null
  
  // Spotify
  if (url.includes('spotify.com')) {
    const match = url.match(/track\/([a-zA-Z0-9]+)/)
    if (match) {
      return `https://open.spotify.com/embed/track/${match[1]}`
    }
  }
  
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([^&\n?#]+)/)
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`
    }
  }
  
  return null
}

interface MessageCardProps {
  message: Message
  index: number
}

export default function MessageCard({ message, index }: MessageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, rotateX: 2 }}
      className="message-card rounded-2xl p-6 flex flex-col gap-4"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Photo */}
      {message.photo && (
        <div className="w-full rounded-xl overflow-hidden flex justify-center">
          <img
            src={message.photo}
            alt={`Foto de ${message.name}`}
            className="max-w-full h-auto block"
            style={{ filter: 'saturate(0.85) brightness(0.95)' }}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.15)' }}
          >
            {message.emoji}
          </div>
          <div>
            <p className="text-white/80 text-base font-medium leading-tight">{message.name}</p>
            <p className="text-white/30 text-xs mt-0.5">{message.relation}</p>
          </div>
        </div>

        {/* Location */}
        {(message.city || message.country) && (
          <div className="text-right flex-shrink-0">
            <p className="text-white/25 text-xs">
              {[message.city, message.country].filter(Boolean).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Message */}
      <blockquote
        className="text-white/60 text-base leading-relaxed font-light italic"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem' }}
      >
        "{message.message}"
      </blockquote>
 
      {/* Song Player */}
      {message.songUrl && (
        <div className="mt-2">
          {getEmbedUrl(message.songUrl) ? (
            <iframe
              src={getEmbedUrl(message.songUrl)!}
              width="100%"
              height={message.songUrl.includes('spotify') ? "80" : "150"}
              frameBorder="0"
              allow="encrypted-media; autoplay"
              className="rounded-lg"
              style={{ border: 'none' }}
            ></iframe>
          ) : (
            <a href={message.songUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#c9a96e] hover:underline flex items-center gap-1">
              <span>🎵</span> Ver canción externa
            </a>
          )}
        </div>
      )}
 
      {/* Footer */}
      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-white/20 text-xs">{message.date}</p>
        <p className="text-white/20 text-xs">{message.time}</p>
      </div>
    </motion.article>
  )
}
