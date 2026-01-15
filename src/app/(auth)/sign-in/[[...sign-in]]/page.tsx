import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function SignInPage() {
  return  <div className="flex items-center min-h-screen justify-center"> 
    <SignIn />
     </div>
}
