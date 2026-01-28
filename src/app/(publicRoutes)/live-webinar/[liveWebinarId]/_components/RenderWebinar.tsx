import { Webinar, WebinarStatusEnum, User } from '@prisma/client' 
import React from 'react'
import WebinarUpcomingState from './UpcomingWebinar/page'

type Props = {
    error: string | undefined
    user: User | null
    webinar: Webinar
    apiKey: string
    token: string
    callId: string
}

const RenderWebinar = ({error, User, webinar, apiKey, token, callId}: Props) => {
   return(
    <>
    {/* TODO: Build a waiting room and live */}
     {webinar.webinarStatus === WebinarStatusEnum.SCHEDULED ? (
     <WebinarUpcomingState
     webinar={webinar} 
     currentUser={User || null} />
    ) : ( 
         '')}
    </>
   )
}

export default RenderWebinar