// this component is responsible for routing to cart page
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";
import usePreviewModal from "@/hooks/modal/usePreviewModal";

import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";


const NavbarAction:React.FC = () => {
    const [mounted,setIsMounted]=useState<boolean>(false)
    const cart = useCart();
    const previewModal = usePreviewModal();
    const router=useRouter()
    useEffect(() => {
        setIsMounted(true);   
    }, [mounted])
    if(!mounted){
        return null
    }
    const handleCart=()=>{
        previewModal.onClose()
        router.push('/cart')

    }
    
    return(
        <div className="flex ml-auto  items-center gap-x-4">
            <Button size="icon" onClick={handleCart}  className="flex items-center w-full rounded-full bg-black px-4 py-2">
                <ShoppingBag size={25} className="text-white" />
                <span className="ml-2 text-sm font-medium text-white">{cart.items.length}</span>

            </Button>

        </div>
    )
}
export default NavbarAction;