import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft,faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import MoviesCard from '../Movies/MoviesCard';
import TvCard from '../Tv/TvCard';
import Innerloading from '../Loading/Innerloading';


export default function SearchGen() {
   let{type,genre,id} = useParams();
   let [data,setData] = useState([]);
   let [page,setPage] = useState(1);
   let [totalPages , setTotalPages]=useState(0)
  let [loading,setLoading] = useState(false)



   let getFilteredData= async()=>{
    setLoading(true)
    let{data} = await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=${page}&with_genres=${genre}`)
    // console.log(data.results);
    setData(data.results);
    setTotalPages(data.total_pages);
    setLoading(false);
   }

   let nextFunc = ()=>{
    setPage(prev=>prev+1);
  }
  let PrevFunc=()=>{
    setPage(prev=>prev-1);
  }

   useEffect(()=>{
    console.log(type, genre);
    getFilteredData();
   },[])

   useEffect(()=>{
    window.scroll(0,0)
    getFilteredData();
    },[page])

  return (
    <>
    
    <div className="container">

    <h3>All <span>{genre}</span> <span>{type=='movie'?"Movies":"Tv Shows"}</span></h3>
    

    <div className="">
      {
        loading? <Innerloading/>
        :


        <div className='row gy-4'>

        {
          type=='movie'?
          
          data.map((d,index)=>(
            <MoviesCard id={d.id} title={d.original_title} pic={d.poster_path} vote={d.vote_average} 
            date={d.release_date} index={index}/>
          ))
          
          :
  
          data.map((tv,index)=>(
            <TvCard id={tv.id} title={tv.original_name} pic={tv.poster_path} vote={tv.vote_average} 
            date={tv.first_air_date} index={index}/>
          ))
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



    </div>

    
    </>
  )
}
