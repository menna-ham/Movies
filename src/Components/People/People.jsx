import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import PeopleCard from './PeopleCard';
import { faFireFlameCurved,faAnglesLeft, faAnglesRight, faPlay, faRss, faStar, faWandSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Innerloading from '../Loading/Innerloading';
import { useContext } from 'react';
import { FavoriteContext } from '../../AddContext/FavoriteContext';

export default function People() {
  let {FavList} = useContext(FavoriteContext)
  let [People, setPeople]= useState([]);
  let [page, setPage]= useState(1);
  let [totalPages, setTotalPages]= useState(1);
  let [loading,setLoading] = useState(false);


  let getPeople =async()=>{
    setLoading(true);
    let{data} = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=240bc430f65781abec22afaf33d14999&language=en-US&page=${page}`)
    // console.log(data);
    setPeople(data.results)
    setTotalPages(data.total_pages)
    setLoading(false)
  }

  let nextFunc = ()=>{
    setPage(prev=>prev+1);
  }
  let PrevFunc=()=>{
    setPage(prev=>prev-1);
  }
  

  useEffect(()=>{
    window.scroll(0,0)
    getPeople();
  },[])
  useEffect(()=>{
    window.scroll(0,0)
    getPeople(page)
  },[page])


  return (
    <>
    
    <div className="container">
      <h1>Actors</h1>
      <p className='fs-5 w-75'>“Your need for acceptance can make you invisible in this world. Don't let anything stand in the way of the light that shines through this form. Risk being seen in all of your glory.”
      ― Jim Carrey</p>

      {
        loading?<Innerloading/>:

        <div className="row mt-4 gy-4">

        {
          People.map((p,index)=>{

            return(

              <div key={p.id} className="col-lg-4 col-md-6 col-sm-6">
              <PeopleCard obj={p} pic={p.profile_path} name={p.name} known={p.known_for} id={p.id} dept={p.known_for_department} />
      
              </div>
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
