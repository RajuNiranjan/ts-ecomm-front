// Note: AnimatedText component
// this component is for animating text
import React, { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from "@/lib/utils";
type AnimatedTextProps = {
    children: React.ReactNode;
    className?: string;
};

const AnimatedText:React.FC<AnimatedTextProps> = ({
    children,
    className
}) => {
    const controls = useAnimationControls();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const rubberBand=()=>{
        controls.start({
            transform:[
                "scale3d(1,1,1)",
                "scale3d(1.4,.55,1)",
                "scale3d(.75,1.25,1)",
                "scale3d(1.25,.85,1)",
                "scale3d(.9,1.05,1)",
                "scale3d(1,1,1)",
            ],
            transition:{
               times:[0,.4,.6,.7,.8,.9],
            }
            
        })
        setIsHovered(true)
    }
  
    
    return (
        <motion.span   className={cn(
            'text-xl hover:text-red-500 hover:underline cursor-pointer',
            className
          )} animate={controls} onMouseOver={()=>{
            if(!isHovered){
                rubberBand()
            }
        }} onAnimationComplete={()=>setIsHovered(false)}>
            {children}
        </motion.span>
    )
}
export default AnimatedText;