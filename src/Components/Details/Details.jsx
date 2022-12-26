import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Details.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import OwlCarousel from 'react-owl-carousel';
import wrong from '../../Imgs/wrong.png'
import Innerloading from '../Loading/Innerloading';
import PaginationNpm from '../Pagination/PaginationNpm';
import { useContext } from 'react'
import { FavoriteContext } from '../../AddContext/FavoriteContext'




export default function Details() {

  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    mouseDrag:true,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    dragevent:'true',
    responsive: {
        0: {items: 1,},
        400: {items: 1,},
        600: {items: 2,},
        700: {items: 3,},
        1000: {items: 3,}
    },
};

  let {id,type} = useParams();
  let [details , setDetails] = useState({});
  let [videos , setVideos] = useState([]);
  let [similar, setSimilar] = useState([])
  let [recommend, setRecommend] = useState([])
  let [watch, setWatch] = useState({});
  let [ar,setAr]= useState('')
  let [en,setEn]= useState('');
  let [Season, setSeason]=useState({})
  let [cast, setCast]=useState([])
  let [crew, setCrew]=useState([])
  let [key, setKey]=useState([])
  let [loading, setLoading]=useState(false)
  let [lenSeason,setLenSeason] = useState(0)

  let {addFavorite} =useContext(FavoriteContext)

  let [vis, setVis]=useState(20)




  


  let getDetails=async()=>{
    setLoading(true);
    let{data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=240bc430f65781abec22afaf33d14999&language=en-US`);
    // console.log(data);
    setDetails(data);
    setLoading(false)
  }
  let getVideos= async()=>{
    let {data}= await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=240bc430f65781abec22afaf33d14999&language=en-US`);
    // console.log(data);
    setVideos(data.results);
  }
  let getSimilar = async()=>{
    let {data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=1`)
    // console.log(data);
    setSimilar(data.results);
  }
  let getRecommended = async()=>{
    let {data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=1`)
    // console.log(data);
    setRecommend(data.results);
  }
  let getWatch = async()=>{
    let {data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=240bc430f65781abec22afaf33d14999`)
    // console.log(data.results);
    setWatch(data.results);
    getLinks();
  }

  let getEpisods= async(num)=>{
      let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${num}?api_key=240bc430f65781abec22afaf33d14999&language=en-US`)
      // console.log(data);
      setSeason(data);
      setLenSeason(data.episodes.lenght)
      // console.log(seasNum);
  }

  let getCast = async()=>{
    let{data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=240bc430f65781abec22afaf33d14999&language=en-US`);
    // console.log(data);
    setCast(data.cast);
    setCrew(data.crew)
  }

  let getkey = async ()=>{
    let {data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/keywords?api_key=240bc430f65781abec22afaf33d14999`)
    // console.log(data);

    if(data.results){
      setKey(data.results);
      // console.log('result true');
    }else if(data.keywords){
      setKey(data.keywords)
      // console.log('keywords true');
    }
  }

  let getLinks=()=>{
    let{AR,US} = watch;
    setAr(AR.link);
    setEn(US.link);
    // console.log(AR.link);
  }

function seeMoreFunc(index,overview){

  if(document.getElementById(`see${index}`)&& document.getElementById(`read${index}`)){
    
    if(document.getElementById(`see${index}`).innerHTML==='See more')
    {
      document.getElementById(`see${index}`).innerHTML='See less';
      document.getElementById(`read${index}`).innerHTML = ` ${overview.split(' ').slice(20, ).join(' ')}`;

    }else if(document.getElementById(`see${index}`).innerHTML==='See less')
    {
      document.getElementById(`read${index}`).innerHTML = '';
      document.getElementById(`see${index}`).innerHTML='See more';

    }
  }
}

// let [currentEpisods, setCurrentEpisods] = useState(1);
// let episodPerPage = 30;
// let numberOfRecordsVistited = currentEpisods * episodPerPage;
// let totalPages = Math.ceil(lenSeason / episodPerPage);

// let changePage = ({ selected }) => {
//   setCurrentEpisods(selected);
// };


function showEpisods(){
  setVis (prev=>prev+10)

}

  useEffect(()=>{
    window.scroll(0,0)
    getDetails();
    getVideos();
    getSimilar();
    getRecommended();
    getWatch();
    getEpisods(1);
    getCast();
    getkey();
  },[])

  return (
    <>

    {
      loading?<Innerloading/> :
      <>
      

    {/*Details*/}
    <div className={`${styles.main}  mx-0`} style={{backgroundImage:`url('https://image.tmdb.org/t/p/w500/${details.backdrop_path}')`}}>
      <div className="container-fluid mx-0 px-0">
      <div className="row mx-0 h-100">
            
            <div className="col-lg-6  col-sm-12 px-sm-0  ms-0  px-0">

              <div className={`${styles.info} w-100  p-4 d-flex justify-content-center flex-column  p-xsm-4 h-100  `}>

                {/**************tv************/}
                <h2>{details.original_name || details.original_title}</h2>
                {
                  details.tagline? <small className='text-danger'> {details.tagline}</small> :''
                }
                <div className='w-75 fs-6 my-2 text-muted p-2  '>

                <div className={`row gy-3 ${styles.smallParent}`}>


                      {
                        details.first_air_date ?
                          <>
                        <div className={`col-md-3 col-sm-2 ${styles.smallSize}`}>
                          <div >
                            <span> {details.first_air_date.split('-')[0]}</span>
                          </div>
                        </div>
                          </>
                          
                          : ''
                      }



                      {
                        details.release_date ?
                          <>
                        <div className={`col-md-3 col-sm-2 ${styles.smallSize}`}>
                          <div>
                            <span> {details.release_date.split('-')[0]}</span>
                          </div>
                        </div>
                          </>

                          : ''
                      }

                      {
                      details.seasons ?
                        <>
                      <div className={`col-md-3 col-sm-2 ${styles.smallSize}`}>

                        <div>
                          <span className='mx-2'>{details.seasons.length == '1' ? <span> {details.seasons.length}Season</span> : `${details.seasons.length} Seasons`}
                          </span>
                        </div>
                      </div>
                        </>

                        : ''
                      }
                  {
                    details.episode_run_time?
                    <div className="col-md-3">
                      <div>
                        <span>{details.episode_run_time[0]}m</span>
                      </div>
                    </div>
                    :''
                  }
                  {
                    details.runtime ? 
                    <div className={`col-md-3 col-sm-3 ${styles.smallSize}`}>
                      <div>
                        <span>{details.runtime}m</span>
                      </div>

                    </div>
                    :''
                  }

                  <div className={`col-md-3 col-sm-2 ${styles.smallSize}`}>
                  <span className='text-capitalize'>{type}</span>

                  </div>

                  {

                    details.origin_country ?
                      <>
                        <div className={`col-md-3 col-sm-2 ${styles.smallSize}`}>
                          <div>
                            {
                              details.origin_country.map((c) => <span className='mx-2'>{c}</span>)
                            }
                          </div>
                        </div>
                      </>

                      : ''
                  }


                </div>
              </div>

                <p className='w-75'>{details.overview}</p>

                <div className='my-2'>
                  {
                    details.created_by? 
                    details.created_by!=''? 
                    <>
                    <span className='text-muted'>Creators : </span>
  
                      {details.created_by.map((c)=><span> {c.name} </span>)}
                      </>
                      :''
                    :''
                  }
                </div>
                {
                  details.production_companies ?
                  details.production_companies.length!=0?                    
                  <>
                  <div  className='my-2'>
                    <span className='text-muted'> Production companies : </span>
                    {
                      details.production_companies.map((p) => {
                        return (
                          <>
                            <span>{p.name} , </span>
                          </>
                        )
                      })
                    }
                  </div>
                  </> :''
                  : ''
                }

              {
                details.production_countries ?
                  details.production_countries != 0 ?
                    <>
                      <div className='my-2'>
                        <span className='text-muted'> Production Countries : </span>
                        {
                          details.production_countries.map((p) => {
                            return (
                              <>
                                <span>{p.name} , </span>
                              </>
                            )
                          })
                        }
                      </div>
                    </>
                    : ''
                  : ''
              }
                <div  className='my-2'>
                  {
                    details.networks? 
                    <>
                  <span className='text-muted'>Networks</span>
                    {
                    details.networks.map((n)=>{
                      return(
                        <span> {n.name}</span>
                      )
                    })
                    }
                    </>

                    :''
                  }
                </div>
                {
                  details.vote_average?
                  <p><FontAwesomeIcon icon={faStar} className='text-warning me-1'/>{details.vote_average.toFixed(1)}</p>
                  :''
                }

                {
                  details.homepage?<a target='_blank' className='btn btn-danger w-25' href={`${details.homepage}`}> Home Page  </a> :''
                }
                

              </div>

            </div>
          </div>
      </div>




    </div>


    {/* More Details*/}
    <div className="moreDets">
      <div className="container">
      <h2 className='text-capitalize py-3'>More Details</h2>
      <div className="row">
        <div className="col-md-8">
          <div>
            <div>
              {
                details.genres? 
                details.genres.lenght!=0?
                <>
                <p className='text-muted mb-1'>Geners & Keywords:</p>
                {
                  details.genres.map((gen,index)=>{
                    return(
                      <span key={index} className='me-2'>{gen.name}</span>
                    )
                  })
                }
                </>
                :'error length'
                :''
              }
            </div>

            <div>
              {
                key?
                key.length!=0?
                key.map((k)=><span className='text-capitalize me-2 mb-2'>{k.name}</span>)
                :'error length'
                :'error Key'
              }
            </div>


            <div className="row">
          {
            cast?
            cast.length!=0?
            <>
           <p className='text-muted mb-1 mt-2'>Cast:</p>
            {
            cast.length>30?
            cast.slice(0,30).map((c,index)=>{
              return(
                <>
                <div key={index} className="col-lg-3 col-md-3 col-sm-4">
                  <p>{c.original_name || c.name} </p>
                </div>
                </>
              )
            })
            :
            cast.map((c,index)=>{
              return(
                <>
                <div key={index} className="col-lg-3 col-md-3 col-sm-4">
                  <p>{c.name||c.original_name}</p>
                </div>
                </>
              )
            })
            
            }
            </>
            :''

            :''
          }
            </div>


            <div className='row'>
                  {
                    crew ?
                      crew.length != 0 ?
                        <>
                          <span className='text-muted'>Director:</span>
                          {

                            crew.length > 30 ?
                              crew.slice(0, 30).map((c, index) => {
                                return (
                                  <>
                                    {c.known_for_department === 'Directing' && c.name != '' ?
                                      <>
                                        <span>{c.name}</span>
                                      </>
                                      : ''}
                                  </>
                                )
                              })
                              :
                              <>
                                {
                                  crew.map((c, index) => {
                                    return (
                                      <>
                                        {c.known_for_department === 'Directing' && c.name != '' ?
                                          <>
                                            <span>{c.name}</span>
                                          </>
                                          : ''}
                                      </>
                                    )
                                  })
                                }
                              </>

                          }
                        </>
                        : ''
                      : ''
                  }

            </div>

           <div className='py-4'>
                  <h4>Watch Here</h4>
                  <div className='d-flex flex-row '>
                    <a className='btn btn-danger me-3' target={'_blank'} href={en}>English Version</a><br/>
                    <a className='btn btn-danger' target={'_blank'} href={ar}>Arabic Version</a>
                  </div>

            </div>
                

          </div>


        </div>
        <div className="col-md-4">
          <div className='my-sm-3'>
            <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} className='img-fluid' />
          </div>
        </div>
      </div>



      </div>
    </div>
    
    
      {/* Slider Videos */}
      {
        videos.length!=0? 
        <div className="container py-4">
        <h2 className='text-capitalize py-3'>Videos {details.original_name || details.original_title}</h2>
  
        <div className="row g-4 ">
  
        <OwlCarousel className='owl-theme ' {...options}>
  
  
            {
              videos.map((vid,index)=>{
                return(
                  <div key={index} className="h-100">
                    <div className={` h-100 `}>
                      <iframe width="100%" src={`https://www.youtube-nocookie.com/embed/${vid.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      <div className='p-1'>
                        <p className='text-center'>{vid.name}</p>
                      </div>
                    </div>
  
                  </div>
                )
              })
            }
        </OwlCarousel>
        </div>
  
  
        </div>
        
        :''
      }

    {/*Episods        63174      */}
    {
      type=='tv'?
      <div className='container'>
        <h2 className='text-capitalize py-3'>Episods :<span className='text-muted'>{details.original_name}</span> </h2>
        <div>
          <select className="form-select w-25 bg-transparent text-white" onChange={(e)=>{getEpisods(e.target.value)}} aria-label="Default select example">
            {
              details.seasons?
              details.seasons.map((se,index)=>{
                return(
                  <>
                  <option key={index}  className='seas bg-black p-1' value={index+1}>
                    Season {index+1}</option>
                  </>
                )
              })
              :'err'
            }
          </select>
        </div>


          {Season.air_date?
          <div className='my-3'>
          <span>Release year:</span>
          <span> {Season.air_date.split('-')[0]}</span>
          </div>:''
          }

          {
            Season.overview? 
            Season.overview!='' ? 
            <div className='text-muted my-1'>
              {Season.overview}
            </div>:''
            :''
          }

        <div className="row epRow gy-3 my-2">
          {/* 2153 */}
          {
            Season.episodes?
            Season.episodes.length>=30?
            <>
                      {
                        Season.episodes.slice(0,vis).map((ep, index) => {
                          return (
                            <>
                              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                                <div className={styles.recommend + ` ep h-100`}>
                                  <img src={ep.still_path != null ? `https://image.tmdb.org/t/p/w500${ep.still_path}` : `${wrong}`} className='img-fluid' />
                                  <div className='p-2'>
                                    <div className='d-flex flex-row justify-content-between'>
                                    <p>{ep.episode_number}. {ep.name}</p>
                                    <p className='text-muted'>{ep.runtime}m</p>
                                    </div>
                                    <div>
                                      {
                                        ep.overview != '' ?

                                          <div>
                                            <span className='text-muted'>{ep.overview.split(' ').slice(0, 20).join(' ')}
                                            </span>
                                            <span id={`read${index}`} className={` allover text-muted `}></span>
                                            <div className='mt-2'>
                                              <p id='see' className='seeBtn' onClick={() => { seeMoreFunc(index, ep.overview) }}>See more</p>
                                            </div>
                                          </div>
                                          : ''
                                      }
                                    </div>
                                  </div>
                                  {
                                    ep.vote_average != 0 ?
                                      <div className='p-2 '>
                                        <FontAwesomeIcon icon={faStar} className='text-warning' />
                                        <span>{ep.vote_average.toFixed(2)}</span>
                                      </div>
                                      : ''
                                  }

                                </div>
                              </div>
                            </>
                          )
                        })

                      }

              <div id='allEps'>
              </div>        
              {/* tv/115646  tv/2153 */}
            <div>
              <button onClick={(e)=>showEpisods()} className='btn btn-danger'>Show All Episods of this Season</button>
            </div>

            </>
            
            :
            //magee4 gnb daaaa 
            Season.episodes.map((ep,index)=>{
              return(
                <>
                <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                  <div className={styles.recommend +` ep h-100`}>
                    <img src={ep.still_path!=null?`https://image.tmdb.org/t/p/w500${ep.still_path}`:`${wrong}`} className='img-fluid'/>
                    <div className='p-2'>
                    <div className=' d-flex flex-row justify-content-between'>
                                    <p>{ep.episode_number}. {ep.name}</p>
                                    <p className='text-muted'>{ep.runtime}m</p>
                     </div>
                      <div>
                    {
                      ep.overview!=''?
                      
                      <div>
                      <span className='text-muted'>{ep.overview.split(' ').slice(0,20).join(' ')}
                      </span>
                      <span id={`read${index}`} className={` allover text-muted `}></span>
                      <div className='mt-2'>
                      <p id='see' className='seeBtn' onClick={()=>{seeMoreFunc(index,ep.overview)}}>See more</p>
                      </div>
                      </div>
                      :''
                    }                    
                  </div>
                    </div>
                    {
                      ep.vote_average!=0?
                      <div className='p-2 '>
                      <FontAwesomeIcon icon={faStar} className='text-warning'/>
                      <span>{ep.vote_average.toFixed(2)}</span>
                    </div>
                      :''
                    }

                  </div>
                </div>
                </>
              )
            })
            :''
          }

        </div>


      </div>:''
    }
      {/*More of this*/}
    <div className="more py-3">
      <div className="container">
        <h2 className='text-capitalize py-3'>More like this</h2>
        <div className="row gy-3">

          {
            similar.map((sim,index)=>{
              return(
                <>
                <div key={sim.index} className="col-lg-3 col-md-4 col-sm-6">
                <a className='nav-link h-100' href={`/details/${type}/${sim.id}`}>
                  <div className="sim pop">
                    <img src={sim.backdrop_path!=null?`https://image.tmdb.org/t/p/w500/${sim.backdrop_path}`:`${wrong}`} className='img-fluid' />
                    <div className='p-2 text-center'>
                    <p>{sim.original_name||sim.original_title}</p>
                    </div>
                  </div>
                  </a>
                </div>
                
                
                </>
              )
            })
          }

        </div>
      </div>
    </div>


      {/*Recommend*/}
      {
        recommend.length==0?'':
        <div>
        <div className="container py-3">
        <h2 className='text-capitalize py-3'>Recommended for you</h2>

          <div className="row gy-3">
            {
              recommend.slice(0,20).map((rec,index)=>{
                return(
                  <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                  <div className={` p-3 h-100 ${styles.recommend}`} >
                  <a className='text-white text-decoration-none pb-2 h6' href={`/details/${type}/${rec.id}`}>{rec.original_name||rec.original_title}</a>

                  <div>
                    {
                      rec.overview!=''?
                      
                      <div>
                      <span className='text-muted'>{rec.overview.split(' ').slice(0,20).join(' ')}
                      </span>
                      <span id={`read${index}`} className={` allover text-muted `}></span>
                      <div className='mt-2'>
                      <p id={`see${index}`} className='seeBtn' onClick={()=>{seeMoreFunc(index,rec.overview)}}>See more</p>
                      </div>
                      </div>
                      :''
                    }                    
                  </div>
                </div>
                  </div>

                )

              })
            }
          </div>
        </div>


    </div>
      }

</>
    }
    </>
  )
}
