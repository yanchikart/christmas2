"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Volume2, VolumeX, Sparkles, Gift, Star } from "lucide-react"

interface Wish {
  id: string
  name: string
  message: string
  timestamp: number
}

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  // Load wishes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("newYearWishes")
    if (stored) {
      setWishes(JSON.parse(stored))
    }
  }, [])

  // Initialize audio
  useEffect(() => {
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wham_-_Last_Christmas_b128f0d267-c6jczx6MrXAheY4SSJNJkoq14Rv36v.mp3")
    audio.loop = true
    audio.volume = 0.3
    audio.play().catch(() => {
      // Auto-play might be blocked, user will need to click music button
      setIsMusicPlaying(false)
    })
    setAudioElement(audio)

    return () => {
      audio.pause()
    }
  }, [])

  const toggleMusic = () => {
    if (audioElement) {
      if (isMusicPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim() || "",
      message: message.trim(),
      timestamp: Date.now(),
    }

    const updatedWishes = [newWish, ...wishes]
    setWishes(updatedWishes)
    localStorage.setItem("newYearWishes", JSON.stringify(updatedWishes))

    // Reset form
    setName("")
    setMessage("")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Snowfall Effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(50)].map((_, i) => {
          const duration = 8 + Math.random() * 12
          const delay = Math.random() * 5
          const animationType = Math.random() > 0.5 ? "snowfall" : "snowfall-slow"

          return (
            <div
              key={i}
              className="absolute text-white/60 text-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10vh`,
                animation: `${animationType} ${duration}s linear infinite ${delay}s`,
              }}
            >
              ❄
            </div>
          )
        })}
      </div>

      {/* Decorative Lights */}
      <div className="fixed top-0 left-0 right-0 h-8 flex justify-around items-center z-20 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const duration = 1 + Math.random() * 2
          const delay = i * 0.3

          return (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: ["#8BCFFF", "#FFD700", "#FF6B9D", "#90EE90"][i % 4],
                animation: `lights ${duration}s ease-in-out infinite ${delay}s`,
              }}
            />
          )
        })}
      </div>

      {/* Music Toggle Button */}
      <Button
        onClick={toggleMusic}
        size="icon"
        className="fixed top-6 right-6 z-50 rounded-full shadow-lg"
        variant="secondary"
      >
        {isMusicPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          {/* Decorative Christmas Tree */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="text-8xl">🎄</div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-pulse">
                <Star className="h-8 w-8 text-secondary fill-secondary" />
              </div>
              {[...Array(6)].map((_, i) => {
                const duration = 2 + Math.random()
                const delay = i * 0.3

                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${20 + i * 12}%`,
                      left: `${30 + (i % 2) * 40}%`,
                      animation: `sparkle ${duration}s ease-in-out infinite ${delay}s`,
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                )
              })}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Новогодние Пожелания 2026
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty">Оставьте своё пожелание для всех! ✨</p>
          <p className="text-lg md:text-xl text-muted-foreground/80">Leave your wish for everyone! 🌟</p>
        </div>

        {/* Wish Form */}
        <Card
          className="mb-16 p-8 backdrop-blur-sm bg-card/50 border-2 border-primary/20"
          style={{ animation: "glow 3s ease-in-out infinite" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="h-8 w-8 text-secondary" />
              <h2 className="text-2xl md:text-3xl font-bold">Напишите своё пожелание</h2>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground/90">
                Ваше имя (необязательно) / Your name (optional)
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Анна / Anna"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50 border-border focus:border-primary"
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground/90">
                Ваше пожелание / Your wish *
              </label>
              <Textarea
                id="message"
                placeholder="Пусть новый год принесёт вам счастье, здоровье и успех! / May the new year bring you happiness, health, and success!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-background/50 border-border focus:border-primary min-h-32 resize-none"
                maxLength={500}
                required
              />
              <p className="text-xs text-muted-foreground text-right">{message.length}/500</p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Отправить пожелание / Send Wish
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Card>

        {/* Wishes Grid */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Пожелания / Wishes
            </span>
          </h2>

          {wishes.length === 0 ? (
            <Card className="p-12 text-center backdrop-blur-sm bg-card/30 border-2 border-dashed border-primary/30">
              <p className="text-xl text-muted-foreground">Станьте первым, кто оставит пожелание! 🎁</p>
              <p className="text-lg text-muted-foreground/80 mt-2">Be the first to leave a wish!</p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishes.map((wish, index) => (
                <Card
                  key={wish.id}
                  className="p-6 backdrop-blur-sm bg-card/50 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group relative overflow-hidden"
                >
                  {/* Sparkle decoration */}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="h-6 w-6 text-secondary" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-secondary fill-secondary" />
                      <p className="font-bold text-lg text-primary">{wish.name || "Аноним / Anonymous"}</p>
                    </div>
                    <p className="text-foreground/90 leading-relaxed text-pretty">{wish.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(wish.timestamp).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center space-y-2">
          <p className="text-muted-foreground">С Новым Годом! 🎊 Happy New Year! 🎉</p>
          <div className="flex justify-center gap-4 text-3xl">🎁 ⭐ 🎄 ❄️ ✨</div>
        </div>
      </div>
    </div>
  )
}
