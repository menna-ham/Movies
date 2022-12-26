import React from 'react'
import { Link } from 'react-router-dom'

export default function SwiperItem(props) {
    let{back, poster, title,id,type,overview} = props;

  return (
    <div className='h-100 position-relative container-fluid' 
    style={{
        backgroundImage:`url(https://image.tmdb.org/t/p/w500/${back})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'center'}}>

        <div className='overSlider  d-flex justify-content-around align-items-center'>

            <div className=' row w-75 m-auto bg-dark swipRow  '>

                <div className="info col-md-7 col-sm-7">

                    <div className=' text-center'>
                    <h2>{title}</h2>
                    <p className='w-75 m-auto'>{overview}</p>

                    <Link className='btn moreBtn rounded-pill my-3' to={`/details/${type}/${id}`}>More Details</Link>

                    </div>

                </div>

                <div className='col-md-5 col-sm-5'>
                    <div className=' postSwip'>
                    <img src={`https://image.tmdb.org/t/p/w500/${poster}`} className='img-fluid'/>
                    </div>

                </div>

            </div>


        </div>
    
    </div>
  )
}
