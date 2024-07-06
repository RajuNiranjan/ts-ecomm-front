// Type: Hooks
// Description: useCurrentUser hook is used to get the current user data

import axios from "axios";
import {useQuery} from "@tanstack/react-query"
import LocalStorageManager from "@/lib/LocalStorageManager"


export type User = {
    id: string;
    displayName: string;
    email: string;
    userRole: string;
    avatarUrl: string;
};
const useCurrentUser = () => {
    const token = LocalStorageManager.getItemWithExpiration("token");
    const {data,isLoading,isError}=useQuery({
        queryKey:['user'],
        queryFn:async()=> {
         
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
                return data as User
            
        }
    })
  return {
    data,
    isLoading,
    isError,
  }
};
export default useCurrentUser;
