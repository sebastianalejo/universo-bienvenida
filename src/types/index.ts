export interface Message {
  id: string
  name: string
  relation: string
  message: string
  city: string
  country: string
  emoji: string
  photo?: string // base64 encoded
  songUrl?: string // Spotify or YouTube link
  timestamp: number
  date: string
  time: string
}

export type RelationType =
  | 'Mamá'
  | 'Papá'
  | 'Abuelo/a'
  | 'Tío/a'
  | 'Primo/a'
  | 'Amigo/a'
  | 'Otro'

export const EMOJIS = ['💛', '🌸', '⭐', '🌙', '💫', '🦋', '🌺', '✨', '🌷', '💕', '🎀', '🌈']

export const RELATIONS: RelationType[] = [
  'Mamá',
  'Papá',
  'Abuelo/a',
  'Tío/a',
  'Primo/a',
  'Amigo/a',
  'Otro',
]
