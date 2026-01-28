'use client'

import React, { useState } from 'react'
import CountDownTimer from './CountDownTimer'
import Image from 'next/image'
import { WebinarStatusEnum } from '@prisma/client'
import WaitListComponent from './WaitListComponent'

type Props = {
  webinar: webinar
  currentUser: User | null
}

const WebinarUpcomingState = ({ webinar, currentUser }: Props) => {
  const [loading, setLoading] = useState(false)
  return (
    <div className="w-full min-h-screen mx-auto max-w-[400px] flex flex-col justify-center items-center gap-8 py-20">
      <div className="space-y-6">
        <p className="text-3xl font-semibold text-primary text-center">
          Seems like you are a little early
        </p>

        <CountDownTimer
          targetDate={webinar.startTime}
          webinarId={webinar.id}
          webinarStatus={webinar.webinarStatus}
          className="text-center"
        />

        <div className="space-y-6 w-full h-full flex justify-center items-center flex-col">
          <div className="w-full max-w-md aspect-[4/3] relative rounded-4xl overflow-hidden mb-6">
            <Image
              src={'/darkthumbnail.png'}
              alt={webinar.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {webinar?.webinarStatus === WebinarStatusEnum.SCHEDULED ? (
            <WaitListComponent
              webinarId={webinar.id}
              webinarStatus="SCHEDULED" />
  ) : (
            ""
          )}
        </div>





      </div>
    </div>
  )
}

export default WebinarUpcomingState