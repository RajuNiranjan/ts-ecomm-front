import React from 'react';
import { Button } from './button';

type PagignationProps = {
    page:number;
    prev():void;
    next():void;
    productLength:number|undefined;  
};

const Pagination:React.FC<PagignationProps> = ({prev,next,page, productLength}) => {
    const [muted,setMuted]=React.useState<boolean>(false)
    React.useEffect(() => {
        setMuted(true)
    }, [])
    if(!muted) return null
    
    return (
        <>
          <div className="flex items-center mb-2 mt-5 justify-center">
     <Button onClick={prev} className="mr-5" disabled={page === 1}>Previous</Button>
   <Button disabled={ productLength!==12} onClick={next}>
        Load More
    </Button> 
   </div>
        </>
    )
}
export default Pagination;