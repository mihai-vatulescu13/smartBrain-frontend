import React from 'react'

const Rank = ({name ,entries}) =>{
    return(
       <div>
          <div className='white f3'>
            {`${name} you've scanned`}
          </div>

          <div className='white f1'>
            {`${entries} faces`}
          </div>
       </div>
    )
}

export default Rank;