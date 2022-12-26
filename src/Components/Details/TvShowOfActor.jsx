import React from 'react'
import wrong from '../../Imgs/wrong.png'
import { Link } from 'react-router-dom';

export default function TvShowOfActor( props) {
  let {see,index,type,id,pic,title,played,over,release}= props;


  return (
    <div className="col-lg-6 col-md-6 col-sm-6">

        <div className='pop h-100' >
          <img src={pic != null ? `https://image.tmdb.org/t/p/w500${pic}` : `${wrong}`} alt="" className='img-fluid' />

          <div className='p-2 text-center  h-100 '>

            <div >
            <Link className='nav-link' to={`/details/${type}/${id}`}>
                <h4 className='text-danger tit'>{title}</h4>
            </Link>
            {
              played!=''?
              <h5 className='text-muted'>Character : <span className='text-white'>{played}</span></h5>              
              :''
            }
            </div>

                   <div>
                      <div>
                      <span className=''>{over.split(' ').slice(0,20).join(' ')}
                      </span>
                      <span id={`r${index}`} className={` allover  `}></span>
                      <div className='mt-2'>
                      <p id={`s${index}`} className={`seeBtn text-muted`} onClick={()=>{see(index,over,`s`,`r`)}}>See more</p>
                      </div>
                      </div>                 
                   </div>

            <div className='mt-auto'>
              {
                release ?
                  release != '' ?
                    <span className='text-muted'> {release.split('-')[0]}</span>
                    : ''
                  : ''
              }
            </div>

          </div>
        </div>
    </div>
  )
}
