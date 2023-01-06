import { faAnglesLeft, faAnglesRight,faTimes, faFireFlameCurved, faPlay, faRss, faStar, faWandSparkles } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Innerloading from '../Loading/Innerloading';
import axios from 'axios';
import { useEffect } from 'react';
import $ from 'jquery';
import wrong from '../../Imgs/wrong.png';
import { Link } from 'react-router-dom';
import ErrorFilteration from '../Error/ErrorFilteration';
import MoviesCard from './MoviesCard';

export default function Movies() {
  let [Movies, setMovies] = useState([]);
  let [category,setCategory] = useState('popular');
  let [active,setActive] = useState(false);
  let [totalPages,setTotalPages]=useState(1);
  let [page,setPage]=useState(1);
  let [loading,setLoading] = useState(false)
  let [selectedGenres, setselectedGenres] = useState([]);
  let [geners, setGeners] = useState([]);
  let joinedGeners = selectedGenres.map((g)=>g.id).join(',');




  let getMovies = async(page)=>{
    setLoading(true);
      let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=${page}`);
      setTotalPages(data.total_pages);
      setMovies(data.results);
      setLoading(false)
  }

  let getMovieGeners =async ()=>{
    let {data} = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=240bc430f65781abec22afaf33d14999&language=en-US')
    // console.log(data);
    setGeners(data.genres);
  }
  let descoverGenres =async(gen)=>{
    setLoading(true) 
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=${page}&with_genres=${joinedGeners}`);
    console.log(data);
    setTotalPages(data.total_pages);
    setMovies(data.results);
    setLoading(false)
  }

  let changeCategory=(e)=>{
    console.log(e.target.id);
    setCategory(e.target.id);
    setPage(1)
    getMovies(e.target.id);
  }

  let handleAddGeners = (gen)=>{
    setselectedGenres([...selectedGenres,gen]);
    setGeners(geners.filter(( g ) => g.id!== gen.id));
    console.log( geners);
    console.log( 'selgen'+ selectedGenres);
    console.log(joinedGeners);
    if(joinedGeners==null){
      getMovies(1)
    }
    descoverGenres();


  }
  let handleRemoveGeners= (gen)=>{
    setselectedGenres(selectedGenres.filter((g)=>g.id!==gen.id));
    setGeners([...geners,gen]);
    if(joinedGeners==null){
      getMovies(1)
    }
    descoverGenres();

  }


  let nextFunc = ()=>{
    setPage(prev=>prev+1);
    console.log(page);
  }
  let PrevFunc=()=>{
    setPage(prev=>prev-1)

  }

  useEffect(()=>{
    window.scroll(0,0)
    getMovies(1);
    getMovieGeners();

  },[])

  useEffect(()=>{
    window.scroll(0,0)
    getMovies(page);
  },[page])
  useEffect(()=>{
    window.scroll(0,0)
    descoverGenres(page)
  },[selectedGenres,geners])



  useEffect(()=>{
    window.scroll(0,0)

    $(".sideBar").click(function() {
      var listItems = $(".sideBar");
      for (let i = 0; i < listItems.length; i++) {
          listItems[i].classList.remove("active");
      }
      this.classList.add("active");
  });
  },[active])

  return (
    <>

      <>
      <div>
      <div className="container">
        <h1>Movies</h1>
        <p className='fs-5 w-75 '>Movies move us like nothing else can, whether they’re scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.</p>

            <div className="side d-flex flex-row justify-content-around py-3 w-75 m-auto">
              <div id='now_playing' onClick={(e)=>{changeCategory(e)}} className='sideBar rounded-3 py-1 my-2 text-danger fs-5 fw-bold  px-3'>
                <FontAwesomeIcon icon={faPlay} className='text-danger' /> Now PLaying
              </div>

              <div id='popular' onClick={(e)=>changeCategory(e)} className='sideBar rounded-3 py-1 my-2 text-danger fs-5 fw-bold  px-3'>
              <FontAwesomeIcon icon={faFireFlameCurved} className='text-danger' /> Popular
              </div>

              <div id='top_rated' onClick={(e)=>changeCategory(e)} className='sideBar rounded-3 py-1 my-2 text-danger fs-5 fw-bold  px-3'>
              <FontAwesomeIcon icon={faStar} className='text-danger' /> Top Rated
              </div>

              <div id='upcoming' onClick={(e)=>changeCategory(e)} className='sideBar rounded-3 py-1 my-2 text-danger fs-5 fw-bold  px-3'>
              <FontAwesomeIcon icon={faRss} className='text-danger' /> Upcoming
              </div>
            </div>

            <div className="row">
            <div className="col-lg-3 col-md-4  d-sm-none d-md-block">
                <div className=''>
                  <div>
                  <p className='fw-bold text-center'>Choose from Geners Also </p>
                  <hr className=' text-white'/>

                  </div>

                  {
                    selectedGenres.map((g,index)=>
                    <>
                    <div key={index} onClick={()=>{handleRemoveGeners(g)}} className='gen sel position-relative bg-danger text-white p-2 text-center my-2 rounded-pill mx-3'>{g.name}
                    <FontAwesomeIcon icon={faTimes} className='text-danger closeIcon bg-white position-absolute p-1 rounded-circle'/>
                    </div>                    
                    </>
                    )
                  }
                  {
                    geners.map((g,index)=>
                    <>
                    <div key={index} onClick={()=>{handleAddGeners(g)}} className=' gen  bg-dark text-danger p-2 text-center my-2 rounded-pill mx-3'>{g.name}
                    </div>
                    </>
                    )
                  }

                </div>
              </div>

              <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="row gy-4">

              {
                loading ? <Innerloading />:
                Movies.length==0?<ErrorFilteration/> :
                  Movies.map((movie, index) => {
                    return (
                      //id,pic,title,vote,date
                      <MoviesCard key={index} obj={movie} id={movie.id} title={movie.original_title} name={movie.title} pic={movie.poster_path} vote={movie.vote_average} 
                      date={movie.release_date} index={index}
                      />
                    )
                  })
              }

              </div>

              </div>
            </div>



            <div className=' d-flex flex-row justify-content-center align-items-center my-4'>
            <button onClick={PrevFunc} disabled={page===1} className='btn btn-outline-danger '>
            <FontAwesomeIcon icon={faAnglesLeft} /> Prev </button>
            <p className='mx-4 mt-3 text-danger'>{page} of {totalPages}</p>
            <button onClick={nextFunc} className='btn btn-outline-danger '>
             Next <FontAwesomeIcon icon={faAnglesRight} /></button>

            </div>


      </div>
      </div>
      </>

    </>
  )
}
