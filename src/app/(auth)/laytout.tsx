import React from 'react'

type props = {
 children: React.ReactNode
}


const Layout = ({children}: props) => {
    return ( 
        <div className='w-full min-h-screen flex justify-center items-center'>
            {children}
        </div>
     );
}

export default Layout;