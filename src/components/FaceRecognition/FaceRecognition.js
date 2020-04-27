import React from 'react'
import './faceRecognition.css'

const FaceRecognition = ({imageUrl , box}) =>{
  const imgStyle={
   width:500,
   height:'auto'
  }  
  // console.log(box)
  return(
      <div className='center ma'> 
        {/* image container */}
        <div className='absolute mt3'>
          <img className='ma3'
          alt=''
          src={imageUrl}
          className=''
          style={imgStyle}
          id='inputimage'
          />
          
          {/* empty div used just for border */}
          <div className = 'bounding-box' style={{
            top:box.topRow,
            left:box.leftCol,
            right:box.rightCol,
            bottom:box.bottomRow
            }}>
  
          </div>
        </div>
      </div>
  )
}

export default FaceRecognition;