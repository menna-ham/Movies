import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'



export default function Footer() {
  return (
    <div className='container  text-muted py-5 px-3 '>
      <p>Questions? Contact us.</p>
      <div className="row my-2 mx-4">
        <div className="col-lg-3 col-md-4 col-sm-6  ">
          <div className="item d-flex justify-content-evenly flex-column">
            <Link className='text-uppercase nav-link my-1'> faq</Link>
            <Link className='text-capitalize nav-link my-1'> investor relation</Link>
            <Link className='text-capitalize nav-link my-1'> privacy</Link>
            <Link className='text-capitalize nav-link my-1'> speed test</Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="item d-flex justify-content-evenly flex-column">
            <Link className='text-capitalize nav-link my-1'> help center</Link>
            <Link className='text-capitalize nav-link my-1'> jobs</Link>
            <Link className='text-capitalize nav-link my-1'> cookie prefrences</Link>
            <Link className='text-capitalize nav-link my-1'> legal notices</Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="item d-flex justify-content-evenly flex-column">
            <Link className='text-uppercase nav-link my-1'> account</Link>
            <Link className='text-capitalize nav-link my-1'> ways to watch</Link>
            <Link className='text-capitalize nav-link my-1'> corporTE INFORMATION</Link>
            <Link className='text-capitalize nav-link my-1'> only on netflix</Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="item d-flex justify-content-evenly flex-column">
            <Link className='text-uppercase nav-link my-1'> media center</Link>
            <Link className='text-capitalize nav-link my-1'> terms of use</Link>
            <Link className='text-capitalize nav-link my-1'> contact us</Link>
          </div>
        </div>
      </div>
      <div className='my-3 '>
        <button className='btn btn-transparent text-muted rounded-0 border-light border-2'>
        <FontAwesomeIcon icon={faGlobe} className='mx-2' />English</button>
      </div>


    </div>
  )
}
