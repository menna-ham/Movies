import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import TrendItem from './TrendItem';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Innerloading from '../Loading/Innerloading';
import { event } from 'jquery';

export default function Trending() {

  let [Trend,setTrend] = useState([]);
  let [loading,setLoading] = useState(false);
  let [time,setTime]= useState('day');
  let [type,setType] = useState('all');
  let [page,setPage] = useState(1);
  let [totalPages,setTotalPages]=useState(1);

  let getTrending= async(time="day",type='all')=>{
    setLoading(true);
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${type}/${time}?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=${page}`)
    // console.log(data);
    setTrend(data.results);
    setTotalPages(data.total_pages)
    setLoading(false)
  }

  let nextFunc = ()=>{
    setPage(prev=>prev+1);
    console.log(page);
  }
  let PrevFunc=()=>{
    setPage(prev=>prev-1)
  }
  let setTypeTrend =(value)=>{
    console.log(value);
    setType(value);
    getTrending(time,value);
  }
  let setTimeTrend=(t)=>{
    console.log(time);
    setTime(t);
    getTrending(t,type)
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

  useEffect(()=>{
      getTrending();
  },[])
  useEffect(()=>{
    getTrending();
  },[page])

  return (
    <>
    <div className="container">
        <h1>Trending Now</h1>
        <p className='fs-5 w-75 text-capitalize'> These are all Trending Movies,Tvs and Actors .. choose what you want to see on this page , even if you want to see all trending.. it's your choice</p>

        <div className='row my-3 mt-4'>

          <div className='col-md-6 '>
            <div className='d-flex flex-row  align-items-center my-2'>
            <span className='me-3 text-muted'>Choose Type of trending :</span>
            <div>
            <select className="form-select bg-transparent text-white" onChange={(e)=>setTypeTrend(e.target.value)} aria-label="Default select example">
              <option value='all' className='bg-black seas'>All</option>
              <option value='movie' className='bg-black seas' >Movies</option>
              <option value='tv' className='bg-black seas' >Tv Shows</option>
              <option value='person' className='bg-black seas' >Actors</option>
            </select>
            </div>
            </div>

          </div>

          <div className="col-md-6 ">
          <div className='d-flex flex-row  align-items-center my-2'>
            <span className='me-3 text-muted'>Choose Period You want to know About :</span>
            <div>
            <select className="form-select bg-transparent text-white" onChange={(e)=>setTimeTrend(e.target.value)} aria-label="Default select example">
              <option value='day' className='bg-black seas' >Day</option>
              <option value='week' className='bg-black seas' >Week</option>
            </select>
            </div>
          </div>

          </div>


        </div>
        {

          loading?<Innerloading/>:
          <div className="row gy-4">

          {
            Trend.map((t,index)=>{
              return(
              <TrendItem key={index} id={t.id}
               name={t.original_title||t.original_name} 
               pic={t.poster_path||t.profile_path} 
               type={t.media_type} 
               over={t.overview} 
               vote={t.vote_average}
               date={t.first_air_date||t.release_date}
               seeMoreFunc={seeMoreFunc}
               index={index}
               obj={t}
               />
                
              )
            })
          }


        </div>

        }


        <div className=' d-flex flex-row justify-content-center align-items-center my-4'>
            <button onClick={PrevFunc} disabled={page===1} className='btn btn-outline-danger '>
            <FontAwesomeIcon icon={faAnglesLeft} /> Prev </button>
            <p className='mx-4 mt-3 text-danger'>{page} of {totalPages}</p>
            <button onClick={nextFunc} className='btn btn-outline-danger '>
             Next <FontAwesomeIcon icon={faAnglesRight} /></button>

        </div>


    </div>

    </>
  )
}
