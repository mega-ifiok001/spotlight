import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/ReusableComponents/LayoutComponents/Sidebar";
import { getAuthenticatedUser } from "@/actions/auth";

type Props = { children: ReactNode };

const Layout = async ({ children }: Props) => {
  const auth = await getAuthenticatedUser();

  // ❌ only redirect if NOT authenticated
  if (auth.status !== 200 && auth.status !== 201) {
    redirect("/sign-in");
  }

  // ✅ DO NOT redirect here if authenticated
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full h-screen overflow-auto px-4 container mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
