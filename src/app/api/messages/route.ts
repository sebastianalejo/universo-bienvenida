import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { Message } from '@/types'

const KEY = 'universo_mensajes'

export async function GET() {
  try {
    const messages = await kv.lrange(KEY, 0, -1)
    // Parsear los mensajes ya que se guardan como strings JSON
    const parsedMessages = messages.map((m) => 
      typeof m === 'string' ? JSON.parse(m) : m
    )
    return NextResponse.json(parsedMessages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Error al obtener mensajes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const message = await request.json()
    
    // Validar mínimamente el mensaje
    if (!message.name || !message.message) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    // Guardar en la lista de Redis (al inicio para que salgan los más recientes primero)
    await kv.lpush(KEY, JSON.stringify(message))
    
    return NextResponse.json({ success: true, message })
  } catch (error) {
    console.error('Error saving message:', error)
    return NextResponse.json({ error: 'Error al guardar el mensaje' }, { status: 500 })
  }
}
