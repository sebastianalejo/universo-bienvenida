'use client'

import { useState, useEffect, useCallback } from 'react'
import { Message } from '@/types'
import { supabase } from '@/lib/supabase'
import { generateId, formatDate } from '@/lib/storage'

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('timestamp', { ascending: false })
        
        if (error) throw error
        
        if (data) {
          setMessages(data as Message[])
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setIsLoaded(true)
      }
    }
    
    fetchMessages()
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
      
      // Actualización optimista (se muestra al usuario inmediatamente)
      setMessages((prev) => [message, ...prev])

      try {
        const { error } = await supabase.from('messages').insert([message])
        if (error) {
          console.error('Error saving message to Supabase:', error)
          // Revertir en caso de error
          setMessages((prev) => prev.filter(m => m.id !== message.id))
          throw error
        }
      } catch (err) {
        console.error('Failed to save message', err)
      }

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
