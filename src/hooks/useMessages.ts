'use client'

import { useState, useEffect, useCallback } from 'react'
import { Message } from '@/types'
import { getMessages, saveMessage, generateId, formatDate } from '@/lib/storage'

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function load() {
      const msgs = await getMessages()
      setMessages(msgs)
      setIsLoaded(true)
    }
    load()
  }, [])

  const addMessage = useCallback(
    async (
      data: Omit<Message, 'id' | 'timestamp' | 'date' | 'time'>
    ): Promise<Message> => {
      const { date, time } = formatDate()
      const message: Message = {
        ...data,
        id: generateId(),
        timestamp: Date.now(),
        date,
        time,
      }
      
      // Guardamos en la nube
      await saveMessage(message)
      
      // Actualizamos el estado local
      setMessages((prev) => [message, ...prev])
      return message
    },
    []
  )

  return { messages, addMessage, isLoaded, count: messages.length }
}

export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const tick = () => {
      const now = Date.now()
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}
