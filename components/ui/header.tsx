// header component for all pages
import React from 'react';
import AnimatedText from './AnimatedText';
import{ChevronLeft} from "lucide-react"

type HeaderProps = {
    title:string;
    description?:string;
};

const Header:React.FC<HeaderProps> = ({title,description}) => {
    
    return(
        <div className="bg-white shadow">
        <div className="max-w-7xl  py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <ChevronLeft className='w-10 h-10 text-gray-500 cursor-pointer' onClick={()=>window.history.back()}/>
                    <h1 className="block text-lg font-bold md:hidden   leading-7 text-gray-900  ">{title}</h1>
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    <div className='hidden md:flex gap-x-2 ml-10'>
                         {title.split('').map((letter,index)=>(
                <AnimatedText key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </AnimatedText>
            ))}
                    </div>
                    </h1>
                </div>
            </div>
            <p className="hidden md:block text-sm text-gray-500">
            {description}
            </p>
        </div>
        </div>
    )
}
export default Header;