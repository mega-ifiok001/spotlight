import { Waitlist } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home(){
  return(
    <div className="grid grid-rows-[20px_1fr_20px]  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-manrope)]       ">
       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex justify-between gap-4 items-center">
          <Link href="/sign-in" className="text-xl font-bold text-center border sm:text-left">Login</Link>
        <Link href="/sign-up" className="text-xl font-bold text-center border sm:text-left">register</Link>
        </div>
    <Waitlist/>
       </main> 
    </div>
  )
}