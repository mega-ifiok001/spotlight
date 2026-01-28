import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, Copy, ExternalLink, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'


type Props = {
    webinarLink: string
    onCreateNew?: () => void
    onClose?: () => void
    
}




const SuccessStep = ({ webinarLink, onCreateNew, onClose }: Props) => {
    const [copied, setCopied] = useState(false)

    const handleCopyLink = () => {
    navigator.clipboard.writeText(webinarLink)
    setCopied(true)
    setTimeout(()=> setCopied(false), 2000)
}
    return (
        <div className='relative text-center space-y-6 py-8 px-6 '>
            <div className="flex items-center justify-center">
                <div className="bg-green-500 rounded-full p-2">
                    <Check className='w-6 h-6 text-primary' />
                </div>
            </div>
            <h2 className="text-2xl font-bold">Your webinar has been created</h2>
            <p className="text-foreground">You can share the link to your viewers for them to join</p>
            <div className="flex mt-4 max-w-md mx-auto">
                <Input
                    value={webinarLink}
                    className='bg-muted border-input rounded-r-none'

                />
                <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className='rounded-1-none border-1-0 border-gray-500'
                >
                    {
                        copied ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )
                    }
                </Button>
            </div>

            <div className="mt-4 flex justify-center">
                <Link
                href={webinarLink}
                target='_blank'
                >
                    <Button
                    variant="outline"
                    className='border-muted text-primary hover:bg-input'>
                        <ExternalLink className="mr-2 h-4 w-4"/>
                        Preview Webinar
                        </Button>
                </Link>
            </div>
            {onCreateNew && (
                <div className="mt-8">
                    <Button
                    onClick={onCreateNew}
                    variant='outline'
                     className="border-gray-700 text-white hover:bg-gray-800">
                        <PlusCircle className='mr-2 h-4 w-4'/>
                        Create Another webinar
                        </Button>
                </div>
            )}
        </div>
    )
}

export default SuccessStep