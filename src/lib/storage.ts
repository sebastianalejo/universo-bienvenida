import { Message } from '@/types'
import messagesData from '@/data/messages.json'

export function getMessages(): Message[] {
  // Ahora simplemente devolvemos los mensajes del archivo JSON
  return messagesData as Message[]
}

export function saveMessage(message: Message): void {
  // No hacemos nada ya que el guardado es manual en el JSON
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
