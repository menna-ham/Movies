import React, { useState } from 'react'
import joi, { allow } from 'joi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import styles from './Login.module.css'


export default function Login({getUserToken}) { let [user , setUser] = useState({
  'email':'',
  'password':'',
})
const [apiError, setApiError] = useState('')
const [Loading, setLoading] = useState(false)
let navigate = useNavigate()
let [email,setEmail]= useState('')
let [password,setPassword]= useState('');
let [validError,setvalidError] = useState([]);
let getInputValue =(e)=>{
  let myUser = {...user}
  myUser[e.target.name]=e.target.value;
  setUser(myUser);
}
let gotoHome=()=>{
  navigate('/home')
}

let validateUser =()=>{
  let schema = joi.object({
    email:joi.string().required().email({tlds:{allow:['com','net']}}),
    password:joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/))
  })
  return schema.validate(user,{abortEarly:false});
}


let validateEmail=(e)=>{
  let schema = joi.string().required().email({tlds:{allow:['com','net']}})
  let res = schema.validate(e.target.value);
        if(res.error){
            setEmail(res.error.details[0].message.replace(`"vlue"`,'Email'))
            return email;
          }else{
            setEmail('')
            return email;
          }
}
let validatePass=(e)=>{
  let schema = joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/))
  let res = schema.validate(e.target.value);
  if(res.error){
    setPassword(res.error.details[0].message.replace(`"vlue"`,'Password'))
    return password;
  }else{  
    setPassword('')
    return password;
  }
}



let submitFormData=async (e)=>{
  e.preventDefault()
  let valid= validateUser();
  setLoading(true);
  
  if(valid.error){
    console.log(valid.error.details);
    setvalidError(valid.error.details)
    setLoading(false);

  }else{
      let {data}= await axios.post('https://route-movies-api.vercel.app/signin',user)
      if(data.message==='success')
      {
        gotoHome()
        localStorage.setItem('token',data.token)
        getUserToken()
        // console.log(data.token);
      }else{
        console.log(data.message);
        setApiError(data.message);
        console.log(apiError);
        setLoading(false);


      }
  }

}

return (
  <>
  <div className={`${styles.photoBg}   text-center p-5`}>
  
    <div className={`container my-5 p-5 d-flex  flex-column justify-content-center align-items-center `}>

    <div className={`w-75 m-auto py-5 d-flex flex-column rounded-3 p-3 ${styles.lightBg}`}>
      <h2 className='text-danger'> Login </h2>

      <form className='my-3' onSubmit={submitFormData}>

      {apiError?<div className='alert alert-danger p-3'> {apiError}</div>:""}

          <div className="my-3">
            <label htmlFor="email" className='pb-2'>Email:</label>
            <input onChange={(e)=>{getInputValue(e); validateEmail(e)}} type="text" className='form-control bg-transparent text-white  shadow-none' name='email' />
            {email==''? "": <div className='alert alert-danger p-2 my-2'> {email}</div>}
          
          </div>
          <div className="my-3">
            <label htmlFor="password" className='pb-2'>Password:</label>
            <input onChange={(e)=>{getInputValue(e); validatePass(e)}} type="password" className='form-control bg-transparent text-white  shadow-none' name='password' />
            {password==''? "": <div className='alert alert-danger p-2 my-2'> {password}</div>}
          
          </div>


        <div className="my-4">
          {
            Loading?<button className='btn btn-danger float-end'> <FontAwesomeIcon icon={faCircleNotch} spin size='1x'/></button>:
            <button type='submit' className='btn btn-danger float-end '> Join </button>
          }
          
          
          <div className="clear-fix"></div>
        </div>
        
      </form>
      { validError.length>0 ? <div className='alert alert-danger w-75 m-auto'>Something wrong in Email or Password</div>:''}
    
  </div>



    </div>

  </div>

  </>
)
}
