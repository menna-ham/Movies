import axios from 'axios'
import Joi from 'joi'
import React from 'react'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorFilteration from '../Error/ErrorFilteration'
import SearchLoading from '../Loading/SearchLoading'
import MoviesCard from '../Movies/MoviesCard'
import PeopleCard from '../People/PeopleCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight,faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import TvCard from '../Tv/TvCard'


export default function SearchMain() {
    let [TvGen, setTvGen] = useState([])
    let [MovieGen, setMovieGen] = useState([])
    let [searchResult, setSearchResult] = useState([])
    let [totalPages, setTotalPages] = useState([])
    let [page, setPage]= useState(1);
    let [SearchText, setSearchText] = useState('')
    let [searchLoad, setSearchLoad] = useState(false)
    let [searchError, setSearchError] = useState(false)
    let [ErrorFilter, setErrorFilter] = useState(false)
    let [Tvs, setTvs] = useState([])
    let [Movies, setMovies] = useState([])
    let [Actors, setActors] = useState([])





    let getGenres = async(type)=>{
        let{data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=240bc430f65781abec22afaf33d14999&language=en-US`);
        // console.log(data);
        if(type==='tv')
        {
            setTvGen(data.genres)
        }else{
            setMovieGen(data.genres)
        }
    }
    let searchFunc = async()=>{
        setSearchLoad(true)
        let {data} =await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=240bc430f65781abec22afaf33d14999&language=en-US&query=${SearchText}&page=${page}&include_adult=false`);
        // console.log(data);
        setSearchResult(data.results)
        setTotalPages(data.total_pages)
        seperated(data.results);
        setSearchLoad(false)
    }

    let seperated =(res)=>{
        let mov = [];
        let tv= [];
        let act =[]
        res.map((m)=>{
            if(m.media_type=='movie')
            {
                mov.push(m)
                //console.log(Movies);
            }else if(m.media_type==='tv')
            {
                tv.push(m)
            }else{
                act.push(m)
            }
        })
        setMovies(mov);
        setTvs(tv);
        setActors(act);

    }

    let validSearch =(value)=>{
        let schema = Joi.string().alphanum().min(2).max(20);
        let res=  schema.validate(value);
        if(res.error){
            setErrorFilter(true);
            console.log(res.error.message.replace(`"value"`,'Search'));
            setSearchError(res.error.message.replace(`"value"`,'Search'))
        }else{
            setSearchError('')
            setErrorFilter(false);
        }


    }

    let nextFunc = ()=>{
        setPage(prev=>prev+1);
      }
      let PrevFunc=()=>{
        setPage(prev=>prev-1);
      }

    useEffect(()=>{
        window.scroll(0,0)
        getGenres('tv');
        getGenres('movie');
        // console.log(TvGen);

    },[])

    useEffect(()=>{
        window.scroll(0,0)
        searchFunc();        
    },[SearchText])
    useEffect(()=>{
        window.scroll(0,0)
        searchFunc();
    },[page])

  return (
    <>
    
    <div className='container'>
        <h1>Search</h1>
        <p className='fs-5 w-75 text-capitalize'>search for what you need and these choices migh help you </p>
        
        <div className='my-3'>
        <input type="text" className="form-control w-75 m-auto bg-black text-white" id="inputPassword" onChange={(e)=>{setSearchText(e.target.value) ; validSearch(e.target.value)}}/>
        {searchError==''?  '':<div className='alert alert-danger w-50 m-auto mt-3'> {searchError}</div>}
        </div>


        {//valide on text 
            SearchText==''?  
                    <div>

                        <div className="row gy-3 mt-3">
                            <div className=' pt-2 mt-2 d-flex flex-row justify-content-between align-content-center'>
                            <h3>Movies</h3>
                            <Link className='text-white fs-6 ' to={'/movies'}> View All</Link>
                            </div>

                            {
                                MovieGen.map((m)=>(
                                    
                                    <div key={m.id} className='col-lg-2 col-md-3'>
                                        <Link className='nav-link h-100' to ={`/searchGen/movie/${m.name}`}>
                                        
                                        <div className='h-100 genSer pop p-3 d-flex align-items-center justify-content-center'>
                                            <p className='text-danger tit'>{m.name}</p>
                                        </div>
                                        </Link>

                                    </div>

                                ))
                            }

                        </div>

                        <div className="row gy-3 mt-3">
                            <div className=' pt-2 mt-2 d-flex flex-row justify-content-between align-content-center'>
                            <h3>Tv shows</h3>
                            <Link className='text-white fs-6' to={'/tv'}> View All</Link>
                            </div>

                            {
                                TvGen.map((m)=>(
                                    
                                    <div key={m.id} className='col-lg-2 col-md-3'>
                                        <Link className='nav-link h-100' to ={`/searchGen/tv/${m.name}`}>
                                        
                                        <div className='h-100 genSer pop p-3 d-flex align-items-center justify-content-center'>
                                            <p className='text-danger tit'>{m.name}</p>
                                        </div>
                                        </Link>

                                    </div>

                                ))
                            }

                        </div>

                    </div>
            
           :ErrorFilter ? 
                <ErrorFilteration/> :
                searchLoad?
                    <SearchLoading/>:
                    searchResult.length==0?
                    <ErrorFilteration/>
                    :
                    <div>
        
                    {/* actors results */}
                    <div className='my-4'>           
                    {
                            Actors? 
                            Actors.length !=0 ? 
                                <div className='row gy-4'>
                                    <h3> Tv Shows </h3>
                                {
                                    Actors.map((act,index)=>{
                                        return(
                                            //pic,name,known ,id,dept
                                            <div className="col-lg-3 col-md-6">
                                                <div className='h-100'>
                                                <PeopleCard  obj={act} id={act.id} pic={act.profile_path} name={act.name} known={act.known_for} dept={act.known_for_department} 
                                            />
        
                                                </div>
        
                                            </div>
                                        )
                                    })
                                }
                                </div>
        
                            :''
                            :''
                        }
                        
                    </div>
        
                    {/* movies Results */}
                    <div>
                        {
                            Movies? 
                            Movies.length !=0 ? 
                                <div className='row gy-4'>
                                    <h3> Movies</h3>
                                {
                                    Movies.map((m,index)=>{
                                        return(
        
                                            <MoviesCard obj={m} id={m.id} title={m.original_title} pic={m.poster_path} vote={m.vote_average} 
                                            date={m.release_date} index={index}
                                            />
                                        )
                                    })
                                }
                                </div>
        
                            :''
                            :''
                        }
                    </div>
                    
                    {/* Tvs results */}
                    <div className='my-4'>           
                    {
                            Tvs? 
                            Tvs.length !=0 ? 
                                <div className='row gy-4'>
                                    <h3> Tv Shows</h3>
                                {
                                    Tvs.map((tv,index)=>{
                                        return(
        
                                            <TvCard obj={tv} id={tv.id} title={tv.original_name} pic={tv.poster_path} vote={tv.vote_average} 
                                            date={tv.first_air_date} index={index}
                                            />
                                        )
                                    })
                                }
                                </div>
        
                            :''
                            :''
                        }
                    </div>

            <div className=' d-flex flex-row justify-content-center align-items-center my-4'>
            <button onClick={PrevFunc} disabled={page===1} className='btn btn-outline-danger '>
            <FontAwesomeIcon icon={faAnglesLeft} /> Prev </button>
            <p className='mx-4 mt-3 text-danger'>{page} of {totalPages}</p>
            <button onClick={nextFunc} className='btn btn-outline-danger '>
             Next <FontAwesomeIcon icon={faAnglesRight} /></button>
            </div>
        
                </div>

        }




        {/* <div>

            <div className="row gy-3 mt-3">
                <div className=' pt-2 mt-2 d-flex flex-row justify-content-between align-content-center'>
                <h3>Movies</h3>
                <Link className='text-white fs-6 ' to={'/movies'}> View All</Link>
                </div>

                {
                    MovieGen.map((m)=>(
                        
                        <div key={m.id} className='col-lg-2 col-md-3'>
                            <Link className='nav-link h-100' to ={`/searchGen/movie/${m.name}`}>
                            
                            <div className='h-100 genSer pop p-3 d-flex align-items-center justify-content-center'>
                                <p className='text-danger tit'>{m.name}</p>
                            </div>
                            </Link>

                        </div>

                    ))
                }

            </div>

            <div className="row gy-3 mt-3">
                <div className=' pt-2 mt-2 d-flex flex-row justify-content-between align-content-center'>
                <h3>Tv shows</h3>
                <Link className='text-white fs-6' to={'/tv'}> View All</Link>
                </div>

                {
                    TvGen.map((m)=>(
                        
                        <div key={m.id} className='col-lg-2 col-md-3'>
                            <Link className='nav-link h-100' to ={`/searchGen/tv/${m.name}`}>
                            
                            <div className='h-100 genSer pop p-3 d-flex align-items-center justify-content-center'>
                                <p className='text-danger tit'>{m.name}</p>
                            </div>
                            </Link>

                        </div>

                    ))
                }

            </div>

        </div> */}





    </div>
    
    </>
  )
}
