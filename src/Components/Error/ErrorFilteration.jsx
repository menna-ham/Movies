import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function ErrorFilteration() {
  return (
    <div className='vh-75 p-5  d-flex flex-column text-center text-danger justify-content-center align-content-center'>

        <h2> Something went wrong </h2>
        <h2> please try another filteration </h2>
        <FontAwesomeIcon  icon ={faTimes} className='text-danger' size='5x'/>

    </div>
  )
}
