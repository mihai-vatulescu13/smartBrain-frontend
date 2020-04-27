import React from 'react'
import './ImageLinkForm.css'

//destructuring from the props({onInputChange}=props.onInputChange)
const ImageLinkForm = ({onInputChange, onSubmit}) =>{
  return(
      <div className=''>
        <p className='f3 description-text '>
         {'This magic brain will detect faces in your pictures. Give it a try :)'}
        </p>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
            <input type='text'
             className='pa2  f4 w-70 center'
             onChange={onInputChange}
             />
            <button className=' w-30 grow f4 link ph3 pv2 dib bg-light-blue'
                    onClick={onSubmit}
            >
              Detect
            </button>
          </div>
        </div>
      </div>
  )
}

export default ImageLinkForm;