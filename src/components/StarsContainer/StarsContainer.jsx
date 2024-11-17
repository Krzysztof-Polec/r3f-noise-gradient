import { useEffect, useState, useRef, memo } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import styles from "./StarsContainer.module.scss"

const StarsContainer = memo(() => {
  const [stars, setStars] = useState([])
  const [nextStarTime, setNextStarTime] = useState(0)
  const starsContainerRef = useRef(null)

  const calculateStarSize = () => {
    const screenWidth = window.innerWidth
    if(screenWidth <= 734) return 92
    if(screenWidth <= 1068) return 120
    if(screenWidth <= 1920) return 140
    return window.innerWidth * 0.103 
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = starsContainerRef.current.getBoundingClientRect()
      const starSize = calculateStarSize()
      const offsetX = e.clientX - rect.left - starSize / 2
      const offsetY = e.clientY - rect.top - starSize / 2

      const currentTime = Date.now()
      if(currentTime >= nextStarTime){
        setStars((prevStars) => [
          ...prevStars,
          { id: Date.now().toString(36) + Math.random().toString(36).substr(2), x: offsetX, y: offsetY }
        ])
        setNextStarTime(currentTime + 100)
      }
    }

    starsContainerRef.current.addEventListener("mousemove", handleMouseMove)

    return () => {
      starsContainerRef.current.removeEventListener("mousemove", handleMouseMove)
    }
  }, [nextStarTime, starsContainerRef])

  useGSAP(() => {
    stars.map((star) => {
      gsap.to(`#star-${star.id}`, {
        opacity: 0,
        duration: 2,
        ease: "power4.out",
        transform: "scale(0.5) rotate(0deg)",
        onComplete: () => setStars((prevStars) => prevStars.filter((s) => s.id !== star.id))
      })
    })
  }, [stars])

  return(
    <div className={styles.starsContainer} ref={starsContainerRef}>
      {stars.map((star) => <div key={star.id} id={`star-${star.id}`} className={styles.star} style={{ left: star.x, top: star.y}}></div>)}
    </div>
  )
})

export default StarsContainer