import React from 'react'
import { Link } from 'react-router-dom';
import netsvg from '../../Imgs/netsvg.svg'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({user ,logOut}) {
  // console.log(user);
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
      <div className="container">

        <Link className="navbar-brand " to={'/'}>
          <span className='SpanLogo '>
            <img src={netsvg} className='logo ' alt='netflixLogo'/>
          </span> 
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
{ user!=null ?           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link active text-uppercase text-danger`: ` nav-link active  text-uppercase`} aria-current="page" to={'/'}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link active text-uppercase text-danger`: ` nav-link active  text-uppercase`} to={'movies'}>Movies</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link active text-uppercase text-danger`: ` nav-link active  text-uppercase`} to={'people'}>Actors</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link active text-uppercase text-danger`: ` nav-link active  text-uppercase`} to={'tv'}>Tv Shows</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link active text-uppercase text-danger`: ` nav-link active  text-uppercase`} to={'trending'}>Trending</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link active text-uppercase text-danger`: ` nav-link active  text-uppercase`} to={'mylist'}>MyList</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link active text-uppercase text-danger`: ` nav-link active  text-uppercase`} to={'search'}> <FontAwesomeIcon icon={faMagnifyingGlass} className='me-1'/>Search</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link active text-uppercase text-danger`: ` nav-link active  text-uppercase`} to={'about'}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={logOut} className={({isActive})=>isActive ? `nav-link active text-uppercase text-danger`: ` nav-link active  text-uppercase`} >Log Out</NavLink>
            </li>
          </ul> :           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link bg-danger rounded-2 active text-uppercase`: ` nav-link active  text-uppercase bg-danger rounded-2`} aria-current="page" to={'register'}>Join Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? `nav-link  active text-uppercase text-danger`: ` nav-link active  text-uppercase`} to={'login'}>Login</NavLink>
            </li>

          </ul>}





        </div>

      </div>
    </nav>
    </>
  )
}
