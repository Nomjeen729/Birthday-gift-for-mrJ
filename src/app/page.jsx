"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Loader from "@/components/Loader"
import Countdown from "@/components/Countdown"
import DaysTogether from "@/components/DaysTogether"
import PhotoGallery from "@/components/PhotoGallery"
import Message from "@/components/Message"
import MusicPlayer from "@/components/MusicPlayer"
import FloatingElements from "@/components/FloatingElements"
import TapToReveal from "@/components/TapToReveal"

const ANNIVERSARY_DATE = "2025-09-21T16:02:00"
const TOGETHER_DATE = "2006-09-29T00:00:00"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showTapToReveal, setShowTapToReveal] = useState(false)
  const [playSong, setPlaySong] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const now = new Date()
    const anniversary = new Date(ANNIVERSARY_DATE)
    if (now >= anniversary) {
      setShowContent(true)
      setShowTapToReveal(true)
    }
  }, [])

  const handleCountdownComplete = () => {
    setShowContent(true)
    setShowTapToReveal(true)
  }

  const handleReveal = () => {
    setShowTapToReveal(false)
    setShowContent(true)
    setTimeout(() => setPlaySong(true), 1000)
  }

  const photos = [
    { src: "/IMG_0155.jpeg", alt: "Саанжигийн төрсөн өдрөөр" },
    { src: "/IMG_2595.jpeg", alt: "Бидний домогт пиццатай зайсан гаралт" },
    { src: "/IMG_6886.jpeg", alt: "Өвлийн тэр нэгэн ногоорсон ногоон өдрүүд" },
    { src: "/IMG_9167.jpeg", alt: "Залуу хүн байж орж гараач, заяаны хань чинь зам дээр хэвтэж байгаа" },
  ]

  const message = `Хайрт Жаагийдаа, 
Чи бид “Хоол хүмүүсийг холбодог” гэх үгийг үнэн гэдгийг амьдрал дээр баталсан найзууд...`

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <FloatingElements />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : !showContent ? (
          <motion.div
            key="countdown-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-4 relative"
          >
            <Countdown targetDate={ANNIVERSARY_DATE} onComplete={handleCountdownComplete} />
          </motion.div>
        ) : showTapToReveal ? (
          <TapToReveal key="tap-to-reveal" onReveal={handleReveal} />
        ) : (
          <>
            <MusicPlayer playSong={playSong} />
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="container mx-auto px-4 py-8"
            >
              <DaysTogether startDate={TOGETHER_DATE} animationDuration={3} />
              <PhotoGallery photos={photos} />
              <Message message={message} />
              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center mt-16 mb-8 text-pink-600"
              >
                <p className="text-lg font-medium">Made with ❤️ by Nomjeen and Myadagaa</p>
              </motion.footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
