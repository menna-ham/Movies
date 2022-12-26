import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { faStar,faHeart,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FavoriteContext } from '../../AddContext/FavoriteContext'
import { useContext } from 'react'


export default function TrendItem(props) {

    let{id,name,pic,date,type,vote,over,seeMoreFunc,index,obj} = props
    let {addFavorite} =useContext(FavoriteContext)


  return (

    <div className="col-lg-3 col-md-4 col-sm-6">

    <div className='pop h-100'>
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${pic}`} className='img-fluid' />
      </div>
      <div className='p-2 '>
        <div className='d-flex flex-row justify-content-between'>
        <Link className='nav-link text-danger tit text-uppercase'

        to={type=='person'?`/perDetails/${id}`:`/details/${type}/${id}`}
        >
        <h5> {name}</h5>        
        </Link>
        {
            type==='person'?''
            :<p>{date? date.split('-')[0]:''}</p>

        }
        </div>
        {
            type==='person'? '' :
            <>

                {
                over != '' ?
                <div>
                  <span className='text-muted'>{over.split(' ').slice(0, 15).join(' ')}
                  </span>
                  <span id={`read${index}`} className={` allover text-muted `}></span>
                  <div className='mt-2'>
                    <p id={`see${index}`} className='seeBtn small' onClick={() => { seeMoreFunc(index, over) }}>See more</p>
                  </div>
                </div>
                : ''
                }             
            </>

            
        }
        
 

        <div className='d-flex flex-row justify-content-between'>
        <p className='text-capitalize'>{type==='person'?'':type}</p>
        {
            type==='person'?'':
            <p className='small'>
            <FontAwesomeIcon icon={faStar} className='text-warning'/> 
            {vote}
        </p>
        }

        </div>
        <div className='p-3 btn rounded-3 my-3 bg-danger favBtn text-white ' onClick={(e)=>addFavorite(e,obj,obj.media_type)} >
                        <FontAwesomeIcon icon={faHeart} className='text-white'/> Favorite</div>
      </div>

    </div>

  </div>

  )
}
