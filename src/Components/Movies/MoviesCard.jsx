
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faHeart,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import wrong from '../../Imgs/wrong.png';
import { useContext } from 'react';
import { FavoriteContext } from '../../AddContext/FavoriteContext';

export default function MoviesCard( props) {
  
    let{id,pic,obj,title,vote,date,name ,index}=props
    let {addFavorite} =useContext(FavoriteContext)

  return (
    <div key={index} className="col-lg-3 col-md-4 col-sm-6">
      <div className='movie pop h-100'>
        <div>
          <img src={pic != null ? `https://image.tmdb.org/t/p/w500/${pic}` : wrong} alt={title} className='w-100' />
        </div>
        <div className='p-2'>
        <Link className='nav-link h-100 pop' to={`/details/movie/${id}`}>
          <h6>{title||name}</h6>
          </Link>

          <div>
          {
              vote!=0? <>
            <FontAwesomeIcon icon={faStar} className='text-warning me-1'/>
              {vote}              
              </>
              :''
            }
          </div>
          <div className='text-muted py-1'>
            { date?date.split('-')[0]:''}
          </div>

          <div className='p-3 btn rounded-3 my-3 bg-danger favBtn text-white ' onClick={(e)=>addFavorite(e,obj,'movie')} >
          <FontAwesomeIcon icon={faHeart} className='text-white'/> Favorite</div>

        </div>

      </div>


  </div>
  )
}
