import React from 'react'
import { useContext } from 'react'
import { FavoriteContext } from '../../AddContext/FavoriteContext'
import wrong from '../../Imgs/wrong.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar ,faHeart} from '@fortawesome/free-regular-svg-icons';
import { useEffect,useState } from 'react';
import { removeData } from 'jquery';
import { faV } from '@fortawesome/free-solid-svg-icons';
import { getDefaultNormalizer } from '@testing-library/react';



export default function MyList() {
  let {FavList,removeLocalfav,removeItem} = useContext(FavoriteContext);
  let [movies, setMovies] = useState([]);
  let [tvs, setTvs] = useState([]);
  let [actors, setActors] = useState([]);
  let [fav,setFav]= useState([FavList])

  //   let tvLocal = JSON.parse(localStorage.getItem('FavTvs'));
  // let moviesLocal = JSON.parse(localStorage.getItem('FavMovies'));
  // let peopleLocal = JSON.parse(localStorage.getItem('FavActors'));
  
  let getData =()=>{

  let tvLocal = JSON.parse(localStorage.getItem('FavTvs'));
  let moviesLocal = JSON.parse(localStorage.getItem('FavMovies'));
  let peopleLocal = JSON.parse(localStorage.getItem('FavActors'));

  if(tvLocal!=null&&tvLocal.length!=0){
    setTvs([...tvLocal])
  }else{setTvs([])}

  if(moviesLocal!=null&&moviesLocal.length!=0){
    setMovies([...moviesLocal])
  }else{setMovies([])}

  if(peopleLocal!=null&&peopleLocal.length!=0){
    setActors([...peopleLocal])
  }else{setActors([])}
  

  }
  
  useEffect(()=>{
    getData()
  },[])
  

  useEffect(()=>{
    window.addEventListener('storage',getData())
  },[tvs])  
  useEffect(()=>{
    window.addEventListener('storage',getData())
  },[actors])
  useEffect(()=>{
    getData()
  },[movies])

  

    return (
    
    <>
      <div className="container">
        <h2>Your Favorite List</h2>


        {/* <div>
          <h1>fav</h1>
          {
            FavList.map((m)=>{
              return(
                <>
                <div className="col-lg-3 col-md-4">
                    <div className="pop h-100">
                      <div className="img">
                        <img src={m.poster_path!=null?`https://image.tmdb.org/t/p/w500/${m.poster_path}`:wrong} className='img-fluid' />
                      </div>
                      <div className='p-2'>
                        <Link className='nav-link h-100 pop' to={`/details/movie/${m.id}`}>
                          <h6>{m.original_title}</h6>
                          </Link>

                          <div>
                          {
                              m.vote_average!=0? <>
                            <FontAwesomeIcon icon={faStar} className='text-warning me-1'/>
                              {m.vote_average}              
                              </>
                              :''
                            }
                          </div>
                          <div className='text-muted py-1'>
                            { m.release_date?m.release_date.split('-')[0]:''}
                          </div>

                          <div className='p-3 btn rounded-3 my-3 bg-danger favBtn text-white ' onClick={(e)=>removeItem(e,m)} >
                          <FontAwesomeIcon icon={faHeart} className='text-white'/> Remove </div>

                      </div>

                    </div>

                  </div>
                </>
              )
            })
          }
        </div> */}
        


local


            <div>
              {
                movies.length != 0 || movies != null ?

                  <div className="row gy-3">
                    <h3>Movies</h3>
                    {

                      movies.map((m, index) => {
                        return (
                          <>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                              <div className="pop h-100">
                                <div className="img">
                                  <img src={m.poster_path != null ? `https://image.tmdb.org/t/p/w500/${m.poster_path}` : wrong} className='img-fluid' />
                                </div>
                                <div className='p-2'>
                                  <Link className='nav-link h-100 pop' to={`/details/movie/${m.id}`}>
                                    <h6>{m.original_title}</h6>
                                  </Link>

                                  <div>
                                    {
                                      m.vote_average != 0 ? <>
                                        <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                        {m.vote_average}
                                      </>
                                        : ''
                                    }
                                  </div>
                                  <div className='text-muted py-1'>
                                    {m.release_date ? m.release_date.split('-')[0] : ''}
                                  </div>

                                  <div className='p-3 btn rounded-3 my-3 bg-danger favBtn text-white ' onClick={(e) => removeLocalfav(m, 'movie')} >
                                    <FontAwesomeIcon icon={faHeart} className='text-white' /> Remove </div>

                                </div>

                              </div>

                            </div>

                          </>
                        )
                      })
                    }
                  </div>

                  : 'error lenght'
              }
            </div>


          {
            tvs!=null? 
            <div className='my-3'>

            {
                tvs.length!=0||tvs!=null?
                <div className="row gy-3">
                  <h3>Tv Shows</h3>
                  {
                tvs.map((m,index)=>{
                  return(
                  <>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="pop h-100">
                      <div className="img">
                        <img src={m.poster_path!=null?`https://image.tmdb.org/t/p/w500/${m.poster_path}`:wrong} className='img-fluid' />
                      </div>
                      <div className='p-2'>
                        <Link className='nav-link h-100 pop' to={`/details/movie/${m.id}`}>
                          <h6>{m.original_name}</h6>
                          </Link>

                          <div>
                          {
                              m.vote_average!=0? <>
                            <FontAwesomeIcon icon={faStar} className='text-warning me-1'/>
                              {m.vote_average}              
                              </>
                              :''
                            }
                          </div>
                          <div className='text-muted py-1'>
                            { m.release_date?m.release_date.split('-')[0]:''}
                          </div>

                          <div className='p-3 btn rounded-3 my-3 bg-danger favBtn text-white ' onClick={(e)=>removeLocalfav(m,'tv')} >
                          <FontAwesomeIcon icon={faHeart} className='text-white'/> Remove </div>

                      </div>

                    </div>

                  </div>
                  </>
                  )
                })
                  }
                </div>

                :'error lenght'
              }
            </div>


            :''
          }

{
            actors!=null? 
            <div className='my-3'>

            {
                actors.length!=0||actors!=null?
                <div className="row gy-3">
                  <h3>Actors</h3>
                  {
                actors.map((a,index)=>{
                  return(
                  <>
                  <div key={index} className=" col-md-5 col-sm-6">
                  <div className="card mb-3 rounded-0 pop darkBG h-100" >
        
                  <div className="row g-0">
                      <div className="col-md-4">
                          <div className='m-auto h-100'>
                          <img src={a.profile_path != null ? `https://image.tmdb.org/t/p/w500/${a.profile_path }` : wrong} className="img-fluid " alt="..."/>
                          </div>
                      </div>
                      <div className="col-md-8">
                      <div className="card-body d-flex flex-column justify-content-between h-100">
                          <Link className='nav-link' to={`/perDetails/${a.id}`}>
                          <h5 className="card-title tit text-danger">{a.name}</h5>
                          </Link>

                          <div className="card-text">
                              {
                                  a.known_for.length!=0?
                                  <>

                                  <p className='m-0 text-muted'>Famouse for :</p>
                                  <div className="row">
                                      {
                                          a.known_for.map((k)=>{
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
                          <p className="card-text  bottom-75"><small className="text-muted">{a.known_for_department}</small></p>
                          <div className=''>

                          </div>
                          <div className='p-3 btn rounded-3 my-3 bg-danger favBtn text-white ' onClick={(e)=>removeLocalfav(a,'people')} >
                              <FontAwesomeIcon icon={faHeart} className='text-white'/> Remove</div>
                      </div>
                      </div>
                  </div>

                </div>

                  </div>
                  </>
                  )
                })
                  }
                </div>

                :'error lenght'
              }
            </div>


            :''
          }


      </div>
    </>
  )
  
}
