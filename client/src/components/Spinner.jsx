import React from 'react'

// Spinner icon
import { ImSpinner9 } from "react-icons/im";

const Spinner = () => {

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <ImSpinner9 className='animate-spin text-8xl text-blue-500'/>
    </div>
  )
}

export default Spinner
