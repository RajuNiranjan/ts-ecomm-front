// parent component of settingform

"use client"
import useCurrentUser from '@/hooks/useCurrentUser';
import React, { useEffect, useState } from 'react';

import SettingForm from './components/SettingForm';

const SettingPage:React.FC = () => {
    const {data:user}=useCurrentUser()
    const [mounted,setIsMounted]=useState<boolean>(false)
    useEffect(() => {
        setIsMounted(true);
      
    }, [])
    if(!mounted){
        return null
    }
 
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 '>
         {user && <SettingForm user={user}/> } 
            </div>
        </div>
    )
}
export default SettingPage;