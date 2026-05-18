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
      message: 'Hola mi bebé te estoy esperando con muchas ansias no dejo de pensar en ti estos días son muy dificiles ya que no te tengo a mi lado, te amo bastante así será siempre, se que también me extrañas ya que solamente conmigo te calmabas. TE AMOO',
      city: 'Lima',
      country: 'Perú',
      emoji: '❤️',
      timestamp: Date.now(),
      date: '18 de mayo de 2026',
      time: '13:56',
    },
  ]
}
