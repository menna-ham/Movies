import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FavoriteContext } from '../../AddContext/FavoriteContext'
import wrong from '../../Imgs/wrong.png'

export default function PeopleCard(props) {

    let{pic,name,known ,id,dept,obj}= props
    // let {addFavorite}= useContext(FavoriteContext);
    let {addFavorite} =useContext(FavoriteContext)

    useEffect(()=>{
        // console.log(addFavorite);
    },[])


  return (

    <div className="card mb-3 rounded-0 pop darkBG h-100" >
        
            <div className="row g-0">
                <div className="col-md-4">
                    <div className='m-auto h-100'>
                    <img src={pic != null ? `https://image.tmdb.org/t/p/w500/${pic}` : wrong} className="img-fluid " alt="..."/>
                    </div>
                </div>
                <div className="col-md-8">
                <div className="card-body d-flex flex-column justify-content-between h-100">
                     <Link className='nav-link' to={`/perDetails/${id}`}>
                    <h5 className="card-title tit text-danger">{name}</h5>
                    </Link>

                    <div className="card-text">
                        {
                            known.length!=0?
                            <>

                            <p className='m-0 text-muted'>Famouse for :</p>
                            <div className="row">
                                {
                                    known.map((k)=>{
                                        return(
                                            <div key={k.id} className='ms-2 d-flex flex-row justify-content-between'>

                                                <Link className='m-0 nav-link  tit' to={`/details/${k.media_type}/${k.id}`}>{k.original_title||k.title||k.name}</Link>
                                                <small className='text-muted'>{k.release_date? k.release_date.split('-')[0]:''}
                                                {k.first_air_date? k.first_air_date.split('-')[0] :''}
                                                </small>

                                            </div>
                                        )
                                    })
                                }
                            </div>                            
                            </>
                            
                            :''
                        }

                    </div>
                    <p className="card-text  bottom-75"><small className="text-muted">{dept}</small></p>
                    <div className=''>

                    </div>
                    <div className='p-3 btn rounded-3 my-3 bg-danger favBtn text-white ' onClick={(e)=>addFavorite(e,obj,'people')} >
                        <FontAwesomeIcon icon={faHeart} className='text-white'/> Favorite</div>
                </div>
                </div>
            </div>

    </div>

  )
}
