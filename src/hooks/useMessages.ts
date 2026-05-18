'use client'

import { useState, useEffect, useCallback } from 'react'
import { Message } from '@/types'
import { getMessages, saveMessage, generateId, formatDate } from '@/lib/storage'

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setMessages(getMessages())
    setIsLoaded(true)
  }, [])

  const addMessage = useCallback(
    (
      data: Omit<Message, 'id' | 'timestamp' | 'date' | 'time'>
    ): Message => {
      const { date, time } = formatDate()
      const message: Message = {
        ...data,
        id: generateId(),
        timestamp: Date.now(),
        date,
        time,
      }
      
      saveMessage(message)
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
