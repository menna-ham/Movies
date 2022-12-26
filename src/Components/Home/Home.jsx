import React from 'react'
import styles from './Home.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faArrowUpRightDots, faFire, faHeart, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect } from 'react';
import SimpleSlider from './Slider'
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import wrong from '../../Imgs/wrong.png';
import MoviesCard from '../Movies/MoviesCard';
import TvCard from '../Tv/TvCard';
import { useContext } from 'react';





export default function Home() {
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    mouseDrag:true,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1,
        },
        600: {
            items: 2,
        },
        700: {
            items: 3,
        },
        1000: {
            items: 5,

        }
    },
};
  let[trend,setTrend] = useState([]);
  let[toptv,setTopTV] = useState([]);
  let[topMovie,setTopMovie] = useState([]);

  let[nowtv,setNowTV] = useState([]);
  let[nowMovie,setNowMovie] = useState([]);

  let[rectv,setRecTV] = useState({});
  let[recMovie,setRecMovie] = useState({});


  let[PopularMovie,setPopularMovie] = useState([]);
  let[PopularTv,setPopularTv] = useState([]);
  let[PopularPerson,setPopularPerson] = useState([]);

  let[upcomMovies,setupcomMovies] = useState([]);
  let[upcomTv,setupcomTv] = useState([]);








  let getTrend=async()=>{
    let{data}= await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=240bc430f65781abec22afaf33d14999');
    // console.log(data);
    setTrend(data.results);
  }

  let getTopMovies=async()=>{
    let{data}= await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=1');
    // console.log(data.results);
    setTopMovie(data.results);
  }
  let getTopTV=async()=>{
    let{data}= await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=1');
    // console.log(data.results);
    setTopTV(data.results);
  }

  let getnowTv=async()=>{
    let {data} = await axios.get('https://api.themoviedb.org/3/tv/airing_today?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=1');
    setNowTV(data.results)
    console.log(data.results);
  }

  let getNowMovie=async()=>{
    let{data}= await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=1');
    setNowMovie(data.results);
  }


  let recentTv=async()=>{
    let {data}= await axios.get('https://api.themoviedb.org/3/tv/latest?api_key=240bc430f65781abec22afaf33d14999&language=en-US')
    // console.log(data);
    setRecTV(data)
  }
  let recentMovie=async()=>{
    let {data}= await axios.get('https://api.themoviedb.org/3/movie/latest?api_key=240bc430f65781abec22afaf33d14999&language=en-US')
    // console.log(data);
    setRecMovie(data)
  }

  let UpMovie = async()=>{
    let {data} = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=1`)
    console.log(data);
    setupcomMovies(data.results);
    
  }

  let UpTv = async()=>{
    let {data} = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=1`)
    // console.log(data);
    setupcomTv(data.results);
    
  }


  let getPopular = async(type)=>{
    let{data} = await axios.get(`https://api.themoviedb.org/3/${type}/popular?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=1`)
    if(type=="movie"){
      setPopularMovie(data.results)
    }else if(type=="tv"){
      setPopularTv(data.results)
    }
    else{
      setPopularPerson(data.results)
    }
  }





useEffect(()=>{
  window.scroll(0,0)
  getTrend();
  recentMovie();
  recentTv();
  getNowMovie();
  getnowTv();
  getTopMovies();
  getTopTV();
  UpMovie();
  UpTv();
  getPopular("movie");
  getPopular("tv");
  getPopular("person");

},[]);


  return (
    <>
     <div className={`position-relative ${styles.imgH}`}>
      <div className={`${styles.text} d-flex justify-content-center align-items-center text-center`}>
        <div>
          <h4>Welcome back!</h4>
          <h1>Unlimited movies, TV</h1>
          <h1>shows, and more.</h1>
          <h4>Watch anywhere, Cancel anytime.</h4>
        </div>
      </div>
     </div> 

    {/*  new to our website */}
    <div className="py-3 my-2">
      <div className="container">
        <h2>New to our website  </h2>

        <div className="row gy-3">
          
          {
            recMovie?
            <>
            <div key={recMovie.id} className="col-lg-3 col-md-4 col-sm-6 ">
              {/* <Link className='nav-link h-100 ' to={`/details/movie/${trend.id}`}> */}
                <div className='movie homeTrend'>
                      <div>
                        <img src={recMovie.poster_path != null ? `https://image.tmdb.org/t/p/w500/${recMovie.poster_path}` : wrong} alt={recMovie.original_title} className='w-100' />
                      </div>
                      <div className='p-2'>
                        <h6>{recMovie.original_title}</h6>
                      <div>
                      {
                        recMovie.vote_average!=0? <>
                        <FontAwesomeIcon icon={faStar} className='text-warning me-1'/>
                        {recMovie.vote_average}              
                        </>
                        :''
                      }
                      </div>
                      <div className='text-muted py-1'>
                        { recMovie.release_date?recMovie.release_date.split('-')[0]:''}
                      </div>
                      </div>
                  </div>
                {/* </Link> */}
              </div>
            
            </>
            :''
          }

          {
            rectv?
            //id,pic,vote,date,title,index
            <>
            <div key={rectv.id} className="col-lg-3 col-md-4 col-sm-6 ">
              {/* <Link className='nav-link h-100 ' to={`/details/movie/${trend.id}`}> */}
                <div className='movie homeTrend'>
                      <div>
                        <img src={rectv.poster_path != null ? `https://image.tmdb.org/t/p/w500/${rectv.poster_path}` : wrong} alt={rectv.original_title} className='w-100' />
                      </div>
                      <div className='p-2'>
                        <h6>{rectv.original_name}</h6>
                      <div>
                      {
                        rectv.vote_average!=0? <>
                        <FontAwesomeIcon icon={faStar} className='text-warning me-1'/>
                        {rectv.vote_average}              
                        </>
                        :''
                      }
                      </div>
                      <div className='text-muted py-1'>
                        { rectv.release_date?rectv.release_date.split('-')[0]:''}
                      </div>
                      </div>
                  </div>
                {/* </Link> */}
              </div>
            
            </>
            :''
          }

        </div>


      </div>
    </div>

    {/* Trending slider */}
    <div className='py-3 my-2'>
        <div className="container">

          <div className='my-2 d-flex flex-row justify-content-between '>
            <h2>Trending Now </h2>
            <div>
            <Link className='text-white fs-6' to={'/trending'}> View All Trending </Link>
            </div>
          </div>
          
          <OwlCarousel className='owl-theme' {...options}>
                        {
                              trend.map((trend,index) => {
                                  return (

                                    <div key={index} className=" h-100 homeTrend">
                                    <Link className='nav-link h-100 ' to={`/details/movie/${trend.id}`}>
                                      <div className='movie homeTrend'>
                                        <div>
                                          <img src={trend.poster_path != null ? `https://image.tmdb.org/t/p/w500/${trend.poster_path}` : wrong} alt={trend.original_title} className='w-100' />
                                        </div>
                                        <div className='p-2'>
                                          <h6>{trend.original_title||trend.original_name}</h6>
                                          <div>
                                            <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                            {trend.vote_average}
                                          </div>
                                          <div className='text-muted py-1'>
                                            { trend.release_date?trend.release_date.split('-')[0]:''}
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                  )
                              })
                            }
          </OwlCarousel>

        </div>

    </div>




    {/* Nav and Tabs  */}
    <div className="filter my-4">
    <div className="container py-4">
    <h2 className='text-capitalize text-danger'>there is some choices  you can see</h2>

    </div>

      <div className=' d-flex flex-column justify-content-center '>

      <ul className="nav nav-pills w-75 m-auto d-flex justify-content-around " id="pills-tab" role="tablist">
        <li className={`nav-item navtry ${styles.navButton}`} role="presentation">
          <p className={`nav-link text-capitalize active text-muted `} id="movie" data-bs-toggle="pill" data-bs-target="#pills-movie" type="button" role="tab" aria-controls="pills-movie" aria-selected="true">
            <FontAwesomeIcon icon={faArrowTrendUp} /> Movies
          </p>
        </li>
        <li className={`nav-item navtry ${styles.navButton}`} role="presentation">
          <p className={`nav-link text-capitalize text-muted`} id="tv" data-bs-toggle="pill" data-bs-target="#pills-tv" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
          <FontAwesomeIcon icon={faFire} /> Tv Shows</p>
        </li>

        <li className={`nav-item navtry ${styles.navButton}`} role="presentation">
          <p className={`nav-link text-capitalize text-muted`} id="actor" data-bs-toggle="pill" data-bs-target="#pills-actor" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
          <FontAwesomeIcon icon={faPlus} /> Actors</p>
        </li>

      </ul>
{/* https://image.tmdb.org/t/p/w500/ */}

      <div className="tab-content" id="pills-tabContent">

          {/* Movies */}
        <div className="tab-pane fade show active" id="pills-movie" role="tabpanel" aria-labelledby="movie" tabIndex="0">
              <div className="p-2">
                <div className="container">
                  <div className="row gx-4 ">
                    <div className='mb-3 d-flex justify-content-between'>
                      <h3>Now Playing</h3>
                      <Link className='text-white' to={'/movies'}>view All</Link>

                    </div>

                  <OwlCarousel className='owl-theme' {...options}>
                  {
                        nowMovie.map((movie,index) => {
                          return (
                            //id,pic,title,vote,date ,index
                                  <div key={index} className=" h-100 homeTrend ">
                                    <Link className='nav-link h-100 ' to={`/details/movie/${trend.id}`}>
                                      <div className='movie homeTrend'>
                                        <div>
                                          <img src={movie.poster_path != null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : wrong} alt={movie.original_title} className='w-100' />
                                        </div>
                                        <div className='p-2'>
                                          <h6>{movie.original_title||movie.original_name}</h6>
                                          <div>
                                            <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                            {movie.vote_average}
                                          </div>
                                          <div className='text-muted py-1'>
                                            { movie.release_date?movie.release_date.split('-')[0]:''}
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                          )
                        })
                      }
                  </OwlCarousel>

                  </div>

                  <div className="row gx-4 ">
                    <div className='mb-3 d-flex justify-content-between'>
                      <h3>Top Rated</h3>
                      <Link className='text-white' to={'/movies'}>view All</Link>

                    </div>

                  <OwlCarousel className='owl-theme' {...options}>
                  {
                        topMovie.map((movie,index) => {
                          return (
                            //id,pic,title,vote,date ,index
                                  <div key={index} className=" h-100 homeTrend ">
                                    <Link className='nav-link h-100 ' to={`/details/movie/${movie.id}`}>
                                      <div className='movie homeTrend'>
                                        <div>
                                          <img src={movie.poster_path != null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : wrong} alt={movie.original_title} className='w-100' />
                                        </div>
                                        <div className='p-2'>
                                          <h6>{movie.original_title||movie.original_name}</h6>
                                          <div>
                                            <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                            {movie.vote_average}
                                          </div>
                                          <div className='text-muted py-1'>
                                            { movie.release_date?movie.release_date.split('-')[0]:''}
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                          )
                        })
                      }
                  </OwlCarousel>

                  </div>

                  <div className="row gx-4 ">
                    <div className='mb-3 d-flex justify-content-between'>
                      <h3>Popular</h3>
                      <Link className='text-white' to={'/movies'}>view All</Link>

                    </div>

                  <OwlCarousel className='owl-theme' {...options}>
                  {
                        PopularMovie.map((movie,index) => {
                          return (
                            //id,pic,title,vote,date ,index
                                  <div key={index} className=" h-100 homeTrend ">
                                    <Link className='nav-link h-100 ' to={`/details/movie/${movie.id}`}>
                                      <div className='movie homeTrend'>
                                        <div>
                                          <img src={movie.poster_path != null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : wrong} alt={movie.original_title} className='w-100' />
                                        </div>
                                        <div className='p-2'>
                                          <h6>{movie.original_title||movie.original_name}</h6>
                                          <div>
                                            <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                            {movie.vote_average}
                                          </div>
                                          <div className='text-muted py-1'>
                                            { movie.release_date?movie.release_date.split('-')[0]:''}
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                          )
                        })
                      }
                  </OwlCarousel>

                  </div>

                  <div className="row gx-4 ">
                    <div className='mb-3 d-flex justify-content-between'>
                      <h3>UpComing</h3>
                      <Link className='text-white' to={'/movies'}>view All</Link>

                    </div>

                  <OwlCarousel className='owl-theme' {...options}>
                  {
                        upcomMovies.map((movie,index) => {
                          return (
                            //id,pic,title,vote,date ,index
                                  <div key={index} className=" h-100 homeTrend ">
                                    <Link className='nav-link h-100 ' to={`/details/movie/${movie.id}`}>
                                      <div className='movie homeTrend'>
                                        <div>
                                          <img src={movie.poster_path != null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : wrong} alt={movie.original_title} className='w-100' />
                                        </div>
                                        <div className='p-2'>
                                          <h6>{movie.original_title||movie.original_name}</h6>
                                          <div>
                                            <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                            {movie.vote_average}
                                          </div>
                                          <div className='text-muted py-1'>
                                            { movie.release_date?movie.release_date.split('-')[0]:''}
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                          )
                        })
                      }
                  </OwlCarousel>

                  </div>




                </div>

              </div>
        </div>

          {/* tv */}

        <div className="tab-pane fade" id="pills-tv" role="tabpanel" aria-labelledby="tv" tabIndex="0">
          <div className="p-22">
                  <div className="container">

                    <div className="row gx-4 ">
                      <div className='mb-3 d-flex justify-content-between'>
                        <h3>Popular Tv Shows</h3>
                      <Link className='text-white' to={'/tv'}>view All</Link>

                      </div>

                    <OwlCarousel className='owl-theme' {...options}>
                    {
                          PopularTv.map((tv,index) => {
                            return (
                              //id,pic,title,vote,date ,index
                                    <div key={index} className=" h-100 homeTrend ">
                                      <Link className='nav-link h-100 ' to={`/details/tv/${tv.id}`}>
                                        <div className='movie homeTrend'>
                                          <div>
                                            <img src={tv.poster_path != null ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : wrong} alt={tv.original_title} className='w-100' />
                                          </div>
                                          <div className='p-2'>
                                            <h6>{tv.original_title||tv.original_name}</h6>
                                            <div>
                                              <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                              {tv.vote_average}
                                            </div>
                                            <div className='text-muted py-1'>
                                              { tv.first_air_date?tv.first_air_date.split('-')[0]:''}
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                            )
                          })
                        }
                    </OwlCarousel>

                    </div>

                    <div className="row gx-4 ">
                      <div className='mb-3 d-flex justify-content-between'>
                        <h3>Top Rated Tv Shows</h3>
                        <Link className='text-white' to={'/tv'}>view All</Link>

                      </div>

                    <OwlCarousel className='owl-theme' {...options}>
                    {
                          toptv.map((tv,index) => {
                            return (
                              //id,pic,title,vote,date ,index
                                    <div key={index} className=" h-100 homeTrend ">
                                      <Link className='nav-link h-100 ' to={`/details/tv/${tv.id}`}>
                                        <div className='movie homeTrend'>
                                          <div>
                                            <img src={tv.poster_path != null ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : wrong} alt={tv.original_title} className='w-100' />
                                          </div>
                                          <div className='p-2'>
                                            <h6>{tv.original_title||tv.original_name}</h6>
                                            <div>
                                              <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                              {tv.vote_average}
                                            </div>
                                            <div className='text-muted py-1'>
                                              { tv.first_air_date?tv.first_air_date.split('-')[0]:''}
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                            )
                          })
                        }
                    </OwlCarousel>

                    </div>

                    <div className="row gx-4 ">
                      <div className='mb-3 d-flex justify-content-between'>
                        <h3>On Air Today</h3>
                        <Link className='text-white' to={'/tv'}>view All</Link>

                      </div>

                    <OwlCarousel className='owl-theme' {...options}>
                    {
                          nowtv.map((tv,index) => {
                            return (
                              //id,pic,title,vote,date ,index
                                    <div key={index} className=" h-100 homeTrend ">
                                      <Link className='nav-link h-100 ' to={`/details/tv/${tv.id}`}>
                                        <div className='movie homeTrend'>
                                          <div>
                                            <img src={tv.poster_path != null ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : wrong} alt={tv.original_title} className='w-100' />
                                          </div>
                                          <div className='p-2'>
                                            <h6>{tv.original_title||tv.original_name}</h6>
                                            <div>
                                              <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                              {tv.vote_average}
                                            </div>
                                            <div className='text-muted py-1'>
                                              { tv.first_air_date?tv.first_air_date.split('-')[0]:''}
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                            )
                          })
                        }
                    </OwlCarousel>

                    </div>

                    <div className="row gx-4 ">
                      <div className='mb-3 d-flex justify-content-between'>
                        <h3>on Air Now </h3>
                        <Link className='text-white' to={'/tv'}>view All</Link>

                      </div>

                    <OwlCarousel className='owl-theme' {...options}>
                    {
                          upcomTv.map((tv,index) => {
                            return (
                              //id,pic,title,vote,date ,index
                                    <div key={index} className=" h-100 homeTrend ">
                                      <Link className='nav-link h-100 ' to={`/details/tv/${tv.id}`}>
                                        <div className='movie homeTrend'>
                                          <div>
                                            <img src={tv.poster_path != null ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : wrong} alt={tv.original_title} className='w-100' />
                                          </div>
                                          <div className='p-2'>
                                            <h6>{tv.original_title||tv.original_name}</h6>
                                            <div>
                                              <FontAwesomeIcon icon={faStar} className='text-warning me-1' />
                                              {tv.vote_average}
                                            </div>
                                            <div className='text-muted py-1'>
                                              { tv.first_air_date?tv.first_air_date.split('-')[0]:''}
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                            )
                          })
                        }
                    </OwlCarousel>

                    </div>




                  </div>

          </div>

        </div>

          {/* people */}

        <div className="tab-pane fade" id="pills-actor" role="tabpanel" aria-labelledby="actor" tabIndex="0">
        <div className="p-2">
                  <div className="container">

                    <div className="row gx-4 ">
                      <div className='mb-3 d-flex justify-content-between'>
                        <h3>Popular Persons</h3>
                        <Link className='text-white' to={'/people'}>view All</Link>

                      </div>

                    <OwlCarousel className='owl-theme' {...options}>
                    {
                          PopularPerson.map((p,index) => {
                            return (
                              //id,pic,title,vote,date ,index
                                    <div key={index} className=" h-100 homeTrend ">
                                      <Link className='nav-link h-100 ' to={`/perDetails/${p.id}`}>
                                        <div className='movie homeTrend'>
                                          <div>
                                            <img src={p.profile_path != null ? `https://image.tmdb.org/t/p/w500/${p.profile_path}` : wrong} alt={p.name} className='w-100' />
                                          </div>
                                          <div className='p-2'>
                                            <h6>{p.name}</h6>

                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                            )
                          })
                        }
                    </OwlCarousel>

                    </div>


                  </div>

          </div>
        
        </div>


      </div>

    </div>



    </div>

    {/* popular  */}

    {/* <div className="popular">
      <div className="container">
      <h3 className='text-capitalize text-center my-3'> check out our favourit choices  </h3>
 
        <div className="row my-4">

        <div className="col-md-2 ">
          <div className="d-flex align-items-start">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <p className="nav-link horizNav text-white active" id="movie-tab" data-bs-toggle="pill" data-bs-target="#movie" type="button" role="tab" aria-controls="movie" aria-selected="true">Movies</p>
              <p className="nav-link horizNav text-white" id="tv-series-tab" data-bs-toggle="pill" data-bs-target="#tv-series" type="button" role="tab" aria-controls="tv-series" aria-selected="false">Tv Series</p>
              <p className="nav-link horizNav text-white" id="actors-tab" data-bs-toggle="pill" data-bs-target="#actors" type="button" role="tab" aria-controls="actors" aria-selected="false">Actors</p>
          </div>

          </div>
        </div>
        <div className="col-md-10">
        <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="movie" role="tabpanel" aria-labelledby="movie-tab" tabIndex="0">
              
              <div className="row  p-3 gy-4">
                {
                  PopularMovie.map((movie)=>{
                    return(
                      <div key={movie.id} className="col-md-3 popu">

                      <div className="pop h-100 rounded-3 ">
                      <Link className='nav-link' to={`/details/movie/${movie.id}`}>

                        <img src={movie.poster_path!=null?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:`${wrong}`} className='img-fluid rounded-top' />
                        <div className='h-100 py-3 px-2 mt-auto'>
                        <h5>{movie.original_title}</h5>
                        <div className='d-flex flex-row justify-content-between'>
                          <p className='text-muted'>{movie.release_date}</p>
                          <p><FontAwesomeIcon icon={faHeart} className='text-danger' /></p>
                          <p className='text-muted'><FontAwesomeIcon icon={faStar} className='text-warning' /> {movie.vote_average}</p>
                        </div>
                        </div>
                        </Link>

                      </div>
                    </div>

                    )

                  })
                }

              </div>
              
              </div>
              <div className="tab-pane fade" id="tv-series" role="tabpanel" aria-labelledby="tv-series-tab" tabIndex="0">
              
              <div className="row  p-3 gy-4">
                {
                  PopularTv.map((tv)=>{
                    return(
                      <div key={tv.id} className="col-md-3 popu">

                      <div className="pop h-100 rounded-3 ">
                      <Link className='nav-link' to={`/details/tv/${tv.id}`}>

                        <img src={tv.poster_path!=null?`https://image.tmdb.org/t/p/w500/${tv.poster_path}`:`${wrong}`} className='img-fluid rounded-top' />
                        <div className='h-100 py-3 px-2 mt-auto'>
                        <h5>{tv.original_name}</h5>
                        <div className='d-flex flex-row justify-content-between'>
                          <p className='text-muted'>{tv.first_air_date}</p>
                          <p><FontAwesomeIcon icon={faHeart} className='text-danger' /></p>
                          <p className='text-muted'><FontAwesomeIcon icon={faStar} className='text-warning' /> {tv.vote_average}</p>
                        </div>
                        </div>
                        </Link>

                      </div>
                    </div>

                    )

                  })
                }

              </div>
              </div>
              <div className="tab-pane fade" id="actors" role="tabpanel" aria-labelledby="actors-tab" tabIndex="0">
              
              <div className="row  p-3 gy-4">
                {
                  PopularPerson.map((person)=>{
                    return(
                      <div key={person.id} className="col-md-3 popu">

                      <div className="pop h-100 rounded-3 ">
                      <Link className='nav-link' to={`/perDetails/${person.id}`}>

                        <img src={person.profile_path!=null?`https://image.tmdb.org/t/p/w500/${person.profile_path}`:`${wrong}`} className='img-fluid rounded-top' />
                        <div className='h-100 py-3 px-2 mt-auto'>
                        <h5>{person.name}</h5>
                        <div className='d-flex flex-row justify-content-between'>
                          <p className='text-muted'>Popularity:  {person.popularity} <FontAwesomeIcon icon={faArrowUpRightDots} className='text-warning' /></p>
                        </div>
                        </div>
                        </Link>

                      </div>
                    </div>

                    )

                  })
                }

              </div>
              </div>
          </div>
        </div>





        </div>
      </div>
    </div> */}




    </>
  )
}
