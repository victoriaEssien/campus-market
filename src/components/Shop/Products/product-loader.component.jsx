
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export const ProdcutLoaderComponent = () => {

    const template = <div className="w-72 rounded-[10px] hover:bg-accent-200" >
                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                        <Typography component="div" variant="p" className="mt-4 text-sm text-left font-os font-medium text-black-500">
                            <Skeleton />
                        </Typography>   
                        <Typography component="div" variant="h3" className='w-24'>
                            <Skeleton />
                        </Typography>   
                    </div>

    return (
        <div className='mx-4 md:mx-14 grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-20 w-fit mt-9'>
            { template }
            { template }
            { template }
            { template }
            { template }
            { template }
            { template }
            { template }
        </div>
    )
}
