import { Message } from '@/types'

const STORAGE_KEY = 'universo_bienvenida_messages_v2'

export function getMessages(): Message[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getSeedMessages()
    return JSON.parse(raw) as Message[]
  } catch {
    return getSeedMessages()
  }
}

export function saveMessage(message: Message): void {
  if (typeof window === 'undefined') return
  const messages = getMessages()
  messages.unshift(message)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
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

// Seed messages so the wall is never empty on first visit
function getSeedMessages(): Message[] {
  return [
    {
      id: 'seed_1',
      name: 'Sebastián',
      relation: 'Papá',
      message: 'Desde el momento en que supe que existías, mi mundo cambió para siempre. Cada mañana me despierto pensando en ti, en cómo serás, en qué sueños tendrás. Ya eres mi razón más hermosa.',
      city: 'Lima',
      country: 'Perú',
      emoji: '⭐',
      timestamp: Date.now() - 86400000 * 2,
      date: '15 de mayo de 2026',
      time: '08:30',
    },
    {
      id: 'seed_2',
      name: 'Mamá',
      relation: 'Mamá',
      message: 'Hija, ya te siento en cada latido. Eres la cosa más hermosa que me ha pasado en la vida. Te espero con todo mi corazón abierto.',
      city: 'Lima',
      country: 'Perú',
      emoji: '🌸',
      timestamp: Date.now() - 86400000,
      date: '16 de mayo de 2026',
      time: '21:15',
    },
    {
      id: 'seed_3',
      name: 'Abuela',
      relation: 'Abuelo/a',
      message: 'Pequeña mía, el día que llegues a este mundo vas a encontrar tanto amor esperándote. Seré tu cómplice, tu confidente y tu abuelita de corazón siempre.',
      city: 'Cusco',
      country: 'Perú',
      emoji: '💕',
      timestamp: Date.now() - 3600000 * 5,
      date: '17 de mayo de 2026',
      time: '14:00',
    },
  ]
}
