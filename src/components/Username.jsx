import React, { useState } from 'react'
import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { verifyUser } from '../helper/helper';
import { useDispatch } from 'react-redux'
import { setUsername } from '../store/slices/user'

function Username() {
  const dispatch = useDispatch()

  const [user, setUser] = useState('')
  const navigate = useNavigate()

  let name
  const input=(e)=>{
    name = e.target.value
    setUser(name)
  }

  const submit=()=>{
    if(user == ""){
      toast.error("Username Required")
    }
    else if(user.includes(' ')){
      toast.error("Invalid Username, enter name without spaces")
    }
    else{
      const userPromise = verifyUser(user)

      toast.promise(userPromise,{
        loading: "Finding user in database...",
        success: <b>User found, Verify your password...</b>,
        error: <b>User not found...</b>
      })

      userPromise.then(()=>{
          dispatch(setUsername(user))
          navigate('/password')
      })
    }
  }
  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center my-[30px]'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold size_II:text-3xl'>Hello Again!</h4>
            <span className='py-3 text-xl w-2/3 text-center text-gray-500 size_II:text-[1rem]'>
              Explore More by connecting with us.
            </span>
          </div>

          <div>
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input  className={styles.textbox} type="text" placeholder='Username' value={user}  onChange={input}/>
                  <button className={styles.btn} onClick={submit}>Let's Go</button>
              </div>

              <div className="text-center py-2">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Username