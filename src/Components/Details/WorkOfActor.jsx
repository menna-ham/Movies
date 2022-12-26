import React from 'react'
import styles from './Details.module.css';
import wrong from '../../Imgs/wrong.png'
import { Link } from 'react-router-dom';



export default function WorkOfActor(props) {
    
     let {see,index,type,id,pic,title,played,over,release}= props;



  return (
    <>
    <div className={`row mb-3 ${styles.mapped} pop `}>
        <div className="col-md-4 col-sm-4">
          <div className={`${styles.imgMap} w-100 m-auto bg-black`}>
          <img src={pic != null ? `https://image.tmdb.org/t/p/w500${pic}` : `${wrong}`} className='w-100' />
          </div>
        </div>
        <div className="col-md-8 col-sm-8">
          <div className='p-2 h-100 d-flex flex-column justify-content-around '>
            <Link className='nav-link' to={`/details/${type}/${id}`}>
                <h4 className='text-danger tit'>{title}</h4>
            </Link>
            {
              played!=''?
              <h5 className='text-muted'>Character : <span className='text-white'>{played}</span> </h5>              
              :''
            }
            <div>
                      <div>
                      <span className=''>{over.split(' ').slice(0,20).join(' ')}
                      </span>
                      <span id={`read${index}`} className={` allover  `}></span>
                      <div className='mt-2'>
                      <p id={`see${index}`} className={`seeBtn text-muted`} onClick={()=>{see(index,over,'see','read')}}>See more</p>
                      </div>
                      </div>                 
            </div>

            <div>
            {
                release? 
                release!=''?
                <span className='text-muted'> {release.split('-')[0]}</span>
                :''
                :''
            }
            </div>


          </div>
        </div>
    </div>

    
    </>
  )
}
