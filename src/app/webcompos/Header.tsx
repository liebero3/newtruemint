"use client"
import { motion } from "framer-motion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu" 
import Link from "next/link"
import { Menu } from "lucide-react"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
const inter = Inter({
    subsets:["latin"],  
    style:["italic","normal"], 
    weight:["500","600","700"]
})  
export default function Header({bild="/luise.jpg",className,children}:{bild?:string, className?:string, children?:ReactNode}){
    return(
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                className={`sticky top-0 z-50 flex p-3 justify-between bg-white max-w-150 lg:max-w-200 mx-auto ${className}`}
            >
                <img src={bild} className=" w-30" alt="" />
                {children}
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className=" flex items-center gap-1 ">
                        <button className={`${inter.className} text-2xl italic `} > Menü </button>
                        <Menu className=" w-10 h-10  "/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" bg-white">
                    <DropdownMenuLabel> <h1 className="">Alles über uns mit MINT</h1></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href={"/"}><h1>Main-Page</h1></Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={"/sidePages/wirSindMint"}><h1> wir sind MINT</h1></Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={"/sidePages/wasLauftBeiMint"}><h1>Was läuft bei MINT</h1></Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={"/sidePages/mintBasis"}><h1>MINT-Basis</h1></Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={"/sidePages/mintEvents"}><h1>MINT-Events</h1></Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={"/sidePages/mintSpezial"}><h1>MINT-Spezial</h1></Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={"/sidePages/MUUN"}><h1>MINT und UNESCO = Nachhaltigkeit</h1></Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={"/sidePages/Spass"}><h1>Sandbox (nur währen beta)</h1></Link></DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </motion.div>
        </>
    )
}