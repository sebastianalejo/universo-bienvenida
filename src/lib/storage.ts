import { Message } from '@/types'

// Ya no usamos STORAGE_KEY porque guardamos en la nube

export async function getMessages(): Promise<Message[]> {
  try {
    const res = await fetch('/api/messages')
    if (!res.ok) throw new Error('Error al obtener mensajes')
    const messages = await res.json()
    
    // Si no hay mensajes en la nube, mostramos los mensajes semilla
    if (!messages || messages.length === 0) {
      return getSeedMessages()
    }
    
    return messages as Message[]
  } catch (error) {
    console.error('Error in getMessages:', error)
    // En caso de error, devolvemos los mensajes semilla para que no quede vacío
    return getSeedMessages()
  }
}

export async function saveMessage(message: Message): Promise<boolean> {
  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
    
    return res.ok
  } catch (error) {
    console.error('Error in saveMessage:', error)
    return false
  }
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

// Mensajes semilla para que nunca esté vacío el mural
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
