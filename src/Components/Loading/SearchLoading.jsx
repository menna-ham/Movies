import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function () {
  return (
    //check on animation is not working
    <div className='vh-100 d-flex justify-content-center align-items-center'>

        <h3 className='serLoading'>Searching <FontAwesomeIcon icon={faMagnifyingGlass} /></h3>

    </div>
  )
}
