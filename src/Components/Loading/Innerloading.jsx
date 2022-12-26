import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'


export default function Innerloading() {
  return (
    <div className='loader vh-100 bg-black d-flex align-items-center justify-content-center'>

    <FontAwesomeIcon icon={faCircleNotch}  size={'4x'} spin className='text-danger' />

    </div>
  )
}
