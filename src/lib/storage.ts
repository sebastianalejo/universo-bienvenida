import { Message } from '@/types'

const STORAGE_KEY = 'universo_bienvenida_messages_v2'

export function getMessages(): Message[] {
  if (typeof window === 'undefined') return getSeedMessages()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getSeedMessages()
    const messages = JSON.parse(raw) as Message[]
    
    if (messages.length === 0) return getSeedMessages()
    
    return messages
  } catch {
    return getSeedMessages()
  }
}

export function saveMessage(message: Message): void {
  if (typeof window === 'undefined') return
  const messages = getMessages()
  
  // Evitar duplicar el mensaje semilla si ya está en localstorage
  const filteredMessages = messages.filter(m => m.id !== message.id)
  filteredMessages.unshift(message)
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMessages))
}

export function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function formatDate(): { date: string; time: string } {
  const now = new Date()
  const date = now.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const time = now.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return { date, time }
}

function getSeedMessages(): Message[] {
  return [
    {
      id: 'seed_1',
      name: 'Sebastián',
      relation: 'Papá',
      message: 'Hola mi bebé te estoy esperando con muchas ansias no dejo de pensar en ti estos días son muy dificiles ya que no te tengo a mi lado, te amo bastante así será siempre, se que también me extrañas ya que solamente conmigo te calmabas. TE AMOO',
      city: 'Lima',
      country: 'Perú',
      emoji: '❤️',
      songUrl: 'https://www.youtube.com/watch?v=fPczdTA1xU0&list=RDfPczdTA1xU0&start_radio=1',
      timestamp: Date.now(),
      date: '18 de mayo de 2026',
      time: '13:56',
    },
  ]
}
