'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import ParentsSection from '@/components/sections/ParentsSection'
import MessageForm from '@/components/sections/MessageForm'
import MuralSection from '@/components/sections/MuralSection'
import Footer from '@/components/sections/Footer'
import { useMessages } from '@/hooks/useMessages'

// Starfield only renders on client (uses canvas)
const Starfield = dynamic(() => import('@/components/ui/Starfield'), { ssr: false })

export default function Home() {
  const { messages, addMessage, count } = useMessages()
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="relative min-h-screen">
      <Starfield />

      <div className="relative z-10">
        <HeroSection messageCount={count} messages={messages} onScrollToForm={scrollToForm} />

        <ParentsSection />

        {/* Section divider */}
        <div className="divider-gold max-w-4xl mx-auto my-4" />

        <MessageForm onSubmit={addMessage} formRef={formRef} />

        <div className="divider-gold max-w-4xl mx-auto my-4" />

        <MuralSection messages={messages} />

        <Footer />
      </div>
    </main>
  )
}
