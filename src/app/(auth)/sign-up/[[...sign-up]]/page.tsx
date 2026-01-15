import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  return  <div className="flex items-center min-h-screen justify-center"> 
    <SignUp />
     </div>
}
