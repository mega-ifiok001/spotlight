"use client"

import { changeWebinarStatus } from "@/actions/webinar"
import { cn } from "@/lib/utils"
import { WebinarStatusEnum } from "@prisma/client"
import React, { useEffect, useRef, useState } from "react"

type Props = {
  targetDate: string
  className?: string
  webinarId: string
  webinarStatus: WebinarStatusEnum
}

const CountDownTimer = ({
  targetDate,
  className,
  webinarId, 
  webinarStatus
}: Props) => {
  const [isExpired, setIsExpired] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // ✅ prevents multiple expiry updates
  const hasExpiredRef = useRef(false)

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  const splitDigits = (num: number) => {
    const formatted = formatNumber(num)
    return [formatted[0], formatted[1]]
  }

  const [days1, days2] = splitDigits(timeLeft.days > 99 ? 99 : timeLeft.days)
  const [hours1, hours2] = splitDigits(timeLeft.hours)
  const [minutes1, minutes2] = splitDigits(timeLeft.minutes)
  const [seconds1, seconds2] = splitDigits(timeLeft.seconds)

  useEffect(() => {
  const parsedTargetDate = new Date(targetDate)
if (Number.isNaN(parsedTargetDate.getTime())) {
  console.error("Invalid targetDate passed to CountDownTimer:", targetDate)
  return
}

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = parsedTargetDate.getTime() - now.getTime()

      if (difference <= 0) {
        if (!isExpired) {
          setIsExpired(true)

          if(webinarStatus === WebinarStatusEnum.SCHEDULED) {
            const updateStatus = async () => {
              try {
                await changeWebinarStatus(
                  webinarId,
                  WebinarStatusEnum.WAITING_ROOM
                )
              } catch (error) {
                console.error(err)
              }
            }
      
            updateStatus()

          }
        }



        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, isExpired, webinarId, webinarStatus]) // ✅ STABLE dependency

  return (
    <div className={cn("text-center", className)}>
      {!isExpired && (
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Days */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Days</p>
            <div className="flex gap-1">
              <div className="bg-secondary w-10 font-bold h-12 flex items-center justify-center rounded text-xl">
                {days1}
              </div>
              <div className="bg-secondary w-10 font-bold h-12 flex items-center justify-center rounded text-xl">
                {days2}
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Hours</p>
            <div className="flex gap-1">
              <div className="bg-secondary font-bold w-10 h-12 flex items-center justify-center rounded text-xl">
                {hours1}
              </div>
              <div className="bg-secondary font-bold w-10 h-12 flex items-center justify-center rounded text-xl">
                {hours2}
              </div>
            </div>
          </div>

          {/* Minutes */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Minutes</p>
            <div className="flex gap-1">
              <div className="bg-secondary w-10 font-bold h-12 flex items-center justify-center rounded text-xl">
                {minutes1}
              </div>
              <div className="bg-secondary w-10 font-bold h-12 flex items-center justify-center rounded text-xl">
                {minutes2}
              </div>
            </div>
          </div>

          {/* Seconds */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Seconds</p>
            <div className="flex gap-1">
              <div className="bg-secondary w-10 font-bold h-12 flex items-center justify-center rounded text-xl">
                {seconds1}
              </div>
              <div className="bg-secondary w-10 font-bold h-12 flex items-center justify-center rounded text-xl">
                {seconds2}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CountDownTimer
