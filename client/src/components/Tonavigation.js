import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Tonavigation() {

  let memberData=useSelector((store)=>{
    return store.memberData
  });
 let navigate= useNavigate()
  useEffect(()=>{
    if(memberData && memberData.email){

    }else{
   navigate('/')
    }
  },[])
  return (
    <div className='navigation'>
      <Link to='/Dashboard'>Dashboard</Link>
       <Link to='/Activities'>Activities</Link>
        <Link to='/Taskss'>Tasks</Link>
         <Link to='/'>Logout</Link>
    </div>
  )
}

export default Tonavigation
