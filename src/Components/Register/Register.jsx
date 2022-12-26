import React, { useState } from 'react'
import joi, { allow } from 'joi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons'
// import faSpin


export default function Register() {

  let [user , setUser] = useState({
    'first_name':'',
    'last_name':'',
    'email':'',
    'password':'',
    'age':'',
  })
  const [apiError, setApiError] = useState('')
  const [Loading, setLoading] = useState(false)
  let navigate = useNavigate()
  let [first,setFirst]= useState('')
  let [last,setLast]= useState('')
  let [email,setEmail]= useState('')
  let [age,setAge]= useState(0)
  let [password,setPassword]= useState('')




  let [validError,setvalidError] = useState([])
  


  let getInputValue =(e)=>{
    let myUser = {...user}
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
  }
  let gotoLogin=()=>{
    navigate('/login')
  }

  let validateUser =()=>{
    let schema = joi.object({
      first_name:joi.string().alphanum().required().min(2).max(10),
      last_name:joi.string().alphanum().required().min(2).max(10),
      age:joi.number().required().min(18).max(80),
      email:joi.string().required().email({tlds:{allow:['com','net']}}),
      password:joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/))
    })
    return schema.validate(user,{abortEarly:false});
  }

  let validateFirst=(e)=>{
    let schema = joi.string().alphanum().required().min(2).max(10)
    let res = schema.validate(e.target.value);
    if(res.error){
      setFirst(res.error.details[0].message.replace(`"value"`,'First Name'))
      return first;
    }else{
      setFirst('')
      return first;
    }
  }

  let validateLast=(e)=>{
    let schema = joi.string().alphanum().required().min(2).max(10)
    let res = schema.validate(e.target.value);
    if(res.error){
      setLast(res.error.details[0].message.replace(`"value"`,'Last Name'))
      return last;
    }else{
      setLast('')
      return last;
    }
  }

  let validateEmail=(e)=>{
    let schema = joi.string().required().email({tlds:{allow:['com','net']}})
    let res = schema.validate(e.target.value);
    if(res.error){
      setEmail(res.error.details[0].message.replace(`"value"`,'Email'))
      return email;
    }else{
      setEmail('')
      return email;
    }
  }
  let validateAge=(e)=>{
    let schema = joi.number().required().min(18).max(80);
    let res = schema.validate(e.target.value);
    if(res.error){
      setAge(res.error.details[0].message.replace(`"value"`,'Age'))
      return age;
    }else{   
      setAge('')
      return age;
    }
  }
  let validatePass=(e)=>{
    let schema = joi.string().required().pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&-+=()._])[a-zA-Z0-9@#$%^&-+=()._]{8,10}/))
    let res = schema.validate(e.target.value);
    if(res.error){
      setPassword(res.error.details[0].message.replace(`"value"`,'Password'))
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
        let {data}= await axios.post('https://route-movies-api.vercel.app/signup',user)
        if(data.message=='success')
        {
          gotoLogin()
        }else{
          setApiError(data.message);
          console.log(apiError);
          setLoading(false);

        }
    }

  }

  return (
    <>
    
    <div className='w-75 m-auto py-5'>
      <h2> Join Us </h2>

      <form className='mt-5' onSubmit={submitFormData}>

      {apiError?<div className='alert alert-danger p-3'> {apiError}</div>:""}

        <div className="my-3">
          <label htmlFor="first_name" className='pb-2'>First Name:</label>
          <input onChange={(e)=>{getInputValue(e); validateFirst(e)}} type="text" className='form-control bg-transparent text-white  shadow-none' name='first_name' />
          {first==''? "": <div className='alert alert-danger p-2 my-2'> {first}</div>}
        </div>

        <div className="my-3">
          <label htmlFor="last_name" className='pb-2'>Last Name:</label>
          <input onChange={(e)=>{getInputValue(e); validateLast(e)}}  type="text" className='form-control bg-transparent text-white  shadow-none' name='last_name' />
          {last==''? "": <div className='alert alert-danger p-2 my-2'> {last}</div>}
        
        </div>

        <div className="my-3">
          <label htmlFor="email" className='pb-2'>Email:</label>
          <input onChange={(e)=>{getInputValue(e); validateEmail(e)}} type="text" className='form-control bg-transparent text-white  shadow-none' name='email' />
          {email==''? "": <div className='alert alert-danger p-2 my-2'> {email}</div>}
        
        </div>

        <div className="my-3">
          <label htmlFor="age" className='pb-2'>Age:</label>
          <input onChange={(e)=>{getInputValue(e); validateAge(e)}}type="number" className='form-control bg-transparent text-white  shadow-none' name='age' />
          {age==0? "": <div className='alert alert-danger p-2 my-2'> {age}</div>}
        
        </div>

        <div className="my-3">
          <label htmlFor="password" className='pb-2'>Password:</label>
          <input onChange={(e)=>{getInputValue(e); validatePass(e)}} type="password" className='form-control bg-transparent text-white  shadow-none' name='password' />
          {password==''? "": <div className='alert alert-danger p-2 my-2'> Password [8,10] contains [upper,lower,special char,number]</div>}
        
        </div>

        <div className="my-4">
          {
            Loading?<button className='btn btn-danger float-end'> <FontAwesomeIcon icon={faCircleNotch} spin size='1x'/></button>:
            <button type='submit' className='btn btn-danger float-end '> Join </button>
          }
          
          
          <div className="clear-fix"></div>
        </div>
      </form>

    </div>
  


    </>
  )
}
