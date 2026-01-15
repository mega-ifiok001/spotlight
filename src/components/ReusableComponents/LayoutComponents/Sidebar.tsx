"use client"

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

type Props = {
    children: React.ReactNode;
}

const Sidebar = ({ children }: Props) => {
    const pathname = usePathname();

    return (
        <div className="
        w-18 sm:w-28 h-screen sticky top-0 py-10 px-2 sm:px-6 border
         bg-background border-border flex flex-col items-center justify-start gap-10">
            SIDEBAR
            </div>
    )

}