"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

// Components
import Loader from "@/components/Loader"
import Countdown from "@/components/Countdown"
import DaysTogether from "@/components/DaysTogether"
import PhotoGallery from "@/components/PhotoGallery"
import Message from "@/components/Message"
import FloatingElements from "@/components/FloatingElements"
import TapToReveal from "@/components/TapToReveal"

const ANNIVERSARY_DATE = "2025-09-22T23:23:00"
const TOGETHER_DATE = "2006-09-29T00:01:00"

// --- MusicPlayer Component ---
function MusicPlayer({ playSong }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio("/bg.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !playSong) return

    if (audio.duration > 45) {
      audio.currentTime = 45
    } else {
      audio.currentTime = 0
    }

    audio.muted = false
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(err => console.error("Playback error:", err))
  }, [playSong])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      if (audio.duration > 45) {
        audio.currentTime = 45
      } else {
        audio.currentTime = 0
      }
      audio.muted = false
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Playback error:", err))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 right-4 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlayback}
        className="bg-white/80 rounded-full cursor-pointer p-3 shadow-lg flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <motion.div
          animate={
            isPlaying
              ? { scale: [1, 1.2, 1], rotate: [0, 5, 0, -5, 0] }
              : { scale: 1 }
          }
          transition={
            isPlaying
              ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              : {}
          }
        >
          {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
