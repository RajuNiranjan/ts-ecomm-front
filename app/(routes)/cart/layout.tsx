"use client"
import { Loader } from "@/components/ui/loader"
import useCurrentUser from "@/hooks/useCurrentUser"
import { redirect } from "next/navigation"

export default function CartLayout({children}:{
    children:React.ReactNode
}) {
    const{data:user,isLoading}=useCurrentUser()
    if(isLoading) return(
       <Loader />
    )
    else if(!user){
        redirect('/auth')
    }
    return (
            <>
                {children}
            </>
      
    )
}