import React from 'react'

const Navigation = ({onRouteChange , isSignedIn}) =>{
    const style={
    //  fontSize:'40px',
     display:'flex',
     justifyContent:'flex-end'

    }

       if(isSignedIn){
         return(
            <nav style={style}>
            <p className='f3 link dim black underline pa4 pointer'
               onClick={() => onRouteChange('signout')}
            >
             Sign Out
            </p>
         </nav>
         )    
        
         }else{
          return(
           <div>
            <nav style={style}>
                <p className='f3 link dim black underline pa4 pointer'
                onClick={() => onRouteChange('signin')}
                >
                Sign In
                </p>

                <p className='f3 link dim black underline pa4 pointer'
                    onClick={() => onRouteChange('register')}
                >
                Register
                </p>
            </nav>
           </div>    
          )
       }
}


export default Navigation;