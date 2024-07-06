import React from 'react';
import { Button } from './button';

type NumberPaginationProps = {
    page:number;
    setPage(page:number):void;
};

const NumberPagination:React.FC<NumberPaginationProps> = ({page,setPage}) => {
    
    return(
        <div className='flex items-center gap-5'>
            <Button onClick={
                ()=>setPage(page)
            }>
               {page} 
            </Button>
        </div>
    )
}
export default NumberPagination;