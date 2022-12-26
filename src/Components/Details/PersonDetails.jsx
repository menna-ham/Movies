import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import styles from './Details.module.css'
import WorkOfActor from './WorkOfActor';
import wrong from '../../Imgs/wrong.png'
import TvShowOfActor from './TvShowOfActor';


export default function PersonDetails() {
  
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
        700: {items: 2,},
        1000: {items: 2,}
    }
  }

    let {id} = useParams();
    let [info,setInfo]=useState({})
    let [imgs,setImgs]=useState([])
    let [Movies,setMovies]=useState([])
    let [Tvs,setTv]=useState([])
    let [tagged,setTagged]=useState([])





    let getActorInfo = async()=>{
        let {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=240bc430f65781abec22afaf33d14999&language=en-US`);
        // console.log(data);
        setInfo(data);
    }
    let getImgs = async()=>{
      let {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}/images?api_key=240bc430f65781abec22afaf33d14999`);
      // console.log(data.profiles);
      setImgs(data.profiles)
    }
    let getMovies= async()=>{
      let{data} =await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=240bc430f65781abec22afaf33d14999&language=en-US`)
      // console.log(data.cast);
      setMovies(data.cast);
    }

    let getTv= async()=>{
      let{data} =await axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=240bc430f65781abec22afaf33d14999&language=en-US`)
      // console.log(data.cast);
      setTv(data.cast);
    }

    let getTaggedImgs= async()=>{
      let{data} =await axios.get(`https://api.themoviedb.org/3/person/${id}/tagged_images?api_key=240bc430f65781abec22afaf33d14999&language=en-US`)
      // let med=[];
      console.log(data.results);
      setTagged(data.results);

    }


    function seeMoreFunc(overview){
      console.log(overview);

      if(document.getElementById(`bs`)&& document.getElementById(`br`)){
        
        if(document.getElementById(`bs`).innerHTML==='Read More')
        {
          document.getElementById(`bs`).innerHTML='Read Less';
          document.getElementById(`br`).innerHTML = ` ${overview.split(' ').slice(20, ).join(' ')}`;
          console.log('more');
    
        }else if(document.getElementById(`bs`).innerHTML==='Read Less')
        {
          document.getElementById(`br`).innerHTML = '';
          document.getElementById(`bs`).innerHTML='Read More';
          console.log('less');
    
        }
      }
    }

    function seeMore(index,overview , see,read){
      console.log(overview);

      if(document.getElementById(`${see}${index}`)&& document.getElementById(`read${index}`)){
        
        if(document.getElementById(`${see}${index}`).innerHTML==='See more')
        {
          document.getElementById(`${see}${index}`).innerHTML='See less';
          document.getElementById(`${read}${index}`).innerHTML = ` ${overview.split(' ').slice(20, ).join(' ')}`;
          console.log('more');
    
        }else if(document.getElementById(`${see}${index}`).innerHTML==='See less')
        {
          document.getElementById(`${read}${index}`).innerHTML = '';
          document.getElementById(`${see}${index}`).innerHTML='See more';
          console.log('less');
    
        }
      }
    }

    

    useEffect(()=>{
      window.scroll(0,0)
        getActorInfo();
        getImgs();
        getMovies();
        getTv();
        getTaggedImgs();
    },[])

  return (
    <>
    {/* Header */}
    <div className="info vh-100 ">

      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-6 px-0 ">
            <div  style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${info.profile_path})`, backgroundRepeat:'no-repeat',backgroundSize:'cover', backgroundPosition:'center center',height:'100vh'}}>
              {/* <img src={`https://image.tmdb.org/t/p/w500/${info.profile_path}`} className='img-fluid m-auto' /> */}
            </div>
          </div>

          <div className={`col-md-6 d-sm-none d-md-block d-lg-block ${styles.hidCol}`}>
            <div className=' vh-100 d-flex flex-column justify-content-center align-items-center'>
              <h1 className='text-uppercase fs-1'>{info.name}</h1>
              <p className='text-uppercase'>{info.known_for_department}</p>
              <div className=''>
              <p className='w-75 m-auto text-center'> 
                {
                  info.also_known_as?
                  info.also_known_as.map((n,index)=>{
                    return(
                      <span key={index}> {n} .</span>
                    )

                  })
                  :''
                }
              </p>
              </div>

            </div>
          </div>

        </div>
      </div>
        
    </div>


    {/************************************** more info *************************************************/}
    <div className='more-info py-5 px-3'>

      <div className="container">
        <h3 className='py-2'> More About <span className='text-danger text-uppercase'> {info.name}</span></h3>
        <div className="row">
          
          <div className="col-lg-6">
            <div className='over my-3'>
              
              <div className='my-2'>
                <span className='text-muted'> Birthday :</span>
                <span> {info.birthday}</span>
              </div>
              <div className='text-capitalize my-2'>
                <span className='text-muted'>place of birth :</span>
                <span> {info.place_of_birth}.</span>
              </div>
              <div className='my-2'>
                <span className='text-muted'>Name on IMBD :</span>
                <span> {info.imdb_id}.</span>
              </div>
              {
                info.biography &&info.biography!=''?
                <div>
                <span className='text-muted'>Biography:</span>
                <div>
                      <span className=''>{info.biography.split(' ').slice(0,60).join(' ')}
                      </span>
                      <span id={`br`} className={` allover  `}></span>
                      <div className=''>
                      <p id={`bs`} className={`seeBtn text-muted`} onClick={()=>{seeMoreFunc(info.biography,`bs`,`br`)}}>Read More</p>
                      </div>
                </div> 
                {/* <p className='mx-3'>{info.biography}</p> */}
              </div>
                
                :''
              }

            </div>
          </div>
          
          <div className="col-lg-6">
            <div>

            <OwlCarousel className='owl-theme ' {...options}>
              {
                imgs.map((img,index)=>{
                  return(
                    <div key={index} className="h-100">
                      <div className={``}>
                      <img src={img.file_path != null ? `https://image.tmdb.org/t/p/w500/${img.file_path}` : wrong} alt="" />
                      </div>

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

    {/******************************************* imgs *******************************/}

    <div className="screens py-3">
      <div className="container">
      <h3 className='py-2'> Screenshots from works of  <span className='text-danger text-uppercase'> {info.name}</span></h3>
      <div className='py-2'>

      <OwlCarousel className='owl-theme ' {...options}>
              {
                tagged.map((tag,index)=>{
                  return(
                    <div key={index} className="h-100">
                      <div className={` h-100 `}>
                      <img className={styles.FixedImg} src={tag.file_path != null ? `https://image.tmdb.org/t/p/w500/${tag.file_path}` : wrong} alt="" />

                      </div>
                      <div className='p-2 text-capitalize text-center'>
                        {
                          tag.media['name']!=''?
                          <h5 >Image form : <span className='text-danger'>{tag.media['name']} </span></h5>                          
                          :''
                        }

                        <p>type of work : <span>{tag.media_type}</span></p>
                      </div>

                    </div>
                  )
                })
              }
            </OwlCarousel>

      </div>


      </div>
    </div>

    {/*********************************** Works of Actor *******************************/}
    <div>
      <div className="container">

        <div className="row ">

        <div className="col-md-6">
          {/* <div> */}
              <div className=''>
        <h3 className='py-2'> Movies of <span className='text-danger text-uppercase'> {info.name}</span></h3>

                {

                  Movies.map((movie, index) => {
                    return (
                      <>
                        <WorkOfActor index={index} see={seeMore} key={index} type={'movie'} id={movie.id} pic={movie.poster_path} title={movie.title} played={movie.character} over={movie.overview} release={movie.release_date} />
                      </>
                    )
                  })
                }
              </div>
            {/* </div> */}
        </div>

        <div className="col-md-6">

          <div className="container-fluid">
          <div className="row gy-3">
        <h3 className='pt-2'> TV shows of  <span className='text-danger text-uppercase'> {info.name}</span></h3>

          {
              Tvs.map((tv,index)=>{
                return(
                  <TvShowOfActor  index={index} see={seeMore}  key={index} type={'tv'} id={tv.id} pic={tv.poster_path} title={tv.name} played={tv.character} over={tv.overview} release={tv.first_air_date}/>

                )
              })
            }
          </div>
          </div>



        </div>
        </div>


      </div>
    </div>

    {/*********************************** Movies of Actor *******************************/}
    {/* <div className="movies">

      <div className="container">
      <h3 className='py-1'> Movies Of <span className='text-danger text-uppercase'> {info.name}</span></h3>

      <div className='py-3'>
      {

        Movies.map((movie, index)=>{
          return(
            <>
            <WorkOfActor index={index} see={seeMore}  key={index} type={'movie'} id={movie.id} pic={movie.poster_path} title={movie.title} played={movie.character} over={movie.overview} release={movie.release_date}/>
            </>
          )
        })
      }
      </div>
      </div>
    </div> */}

    {/************************************  Tv of Actor  ***************************/}
    {/* <div className="tv">

      <div className="container">
      <h3 className='py-1'> Tv Shows  Of <span className='text-danger text-uppercase'> {info.name}</span></h3>

      <div className="py-2">

      <div className="row gy-3">

            {
              Tvs.map((tv,index)=>{
                return(
                  <TvShowOfActor  index={index} see={seeMore}  key={index} type={'tv'} id={tv.id} pic={tv.poster_path} title={tv.name} played={tv.character} over={tv.overview} release={tv.first_air_date}/>

                )
              })
            }

            </div>

      </div>


      </div>
    </div> */}

    {/******************************************* imgs *******************************/}
      
    </>
  )
}
