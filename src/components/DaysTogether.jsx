"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function DaysTogether({ startDate, animationDuration = 3 }) {
    const [displayedDays, setDisplayedDays] = useState(0)
    const [animationComplete, setAnimationComplete] = useState(false)
    const animationRef = useRef(null)

    useEffect(() => {
        const calculateDays = () => {
            const start = new Date(startDate)
            const now = new Date()
            const diffTime = Math.abs(now - start)
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
            return diffDays
        }

        const days = calculateDays()

        // Animation timing
        const duration = animationDuration * 1000
        const fps = 30
        const frames = duration / (1000 / fps)
        const increment = days / frames
        let currentCount = 0

        const startAnimation = () => {
            if (animationRef.current) clearInterval(animationRef.current)

            animationRef.current = setInterval(() => {
                currentCount += increment

                if (currentCount >= days) {
                    currentCount = days
                    clearInterval(animationRef.current)
                    setAnimationComplete(true)
                }

                setDisplayedDays(Math.floor(currentCount))
            }, 1000 / fps)
        }

        // Start animation after a delay
        const timeout = setTimeout(() => {
            startAnimation()
        }, 500)

        return () => {
            clearTimeout(timeout)
            if (animationRef.current) clearInterval(animationRef.current)
        }
    }, [startDate, animationDuration])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="my-16 py-12 px-6 relative"
        >
            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50" />

                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-purple-400" />
                <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-r from-purple-400 to-pink-400" />

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 text-4xl animate-float">💖</div>
                <div className="absolute bottom-4 right-4 text-4xl animate-float-delay">💘</div>
                <div className="absolute top-1/4 right-10 text-3xl animate-float" style={{ animationDelay: "1s" }}>
                    💝
                </div>
            </div>

            <div className="relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl md:py-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-center mb-10 animate-gradient"
                >
                    Хүн болохын төлөөх спермүүдийн өрсөлдөөнт тэмцэлд ялаад
                </motion.h2>

                <div className="flex flex-col items-center justify-center">
                    <div className="relative">
                        <motion.div
                            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-500 mb-6 animate-gradient"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            {displayedDays}
                        </motion.div>

                        {/* Animated particles around the number */}
                        {animationComplete && (
                            <div className="absolute inset-0 pointer-events-none">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute text-xl"
                                        initial={{
                                            x: 0,
                                            y: 0,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            x: (Math.random() - 0.5) * 150,
                                            y: (Math.random() - 0.5) * 150,
                                            opacity: [0, 0.8, 0],
                                            scale: [0.5, 1.5, 0.5],
                                            rotate: Math.random() * 360,
                                        }}
                                        transition={{
                                            duration: 2 + Math.random() * 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: Math.random() * 2,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        {["❤️", "✨", "💖", "💘", "💝"][Math.floor(Math.random() * 5)]}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl md:text-3xl text-pink-500 font-medium mb-8"
                    >
                        өдөр болжээ чи минь
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100px" }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mb-8"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-center text-lg text-gray-600 max-w-2xl"
                    >
                        Хамгаас хайрт чамдаа, энэ хорвоод хэн хүний хайрыг татсан гайхалтай 
                        оршихуй болон мэндэлсэн өдрийн мэнд хүргэе. 19 нас гэх амьдралд ганц 
                        тохиох онцгой нэгэн үеийн чинь нэг хэсэг болсон нь бидний хувьд үнэхээр 
                        нэр төрийн хэрэг байлаа. Чи биднийхээ сэтгэлд оршиж, бодолд өнждөг тийм л чухал хүн шүү!
                    </motion.p>

                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.5, type: "spring" }}
                        className="mt-8 text-5xl"
                    >
                        🥂
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
