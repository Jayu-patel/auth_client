import React, { useEffect, useState } from 'react'
import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useFetch } from '../hooks/fetch.hook';
import { login } from '../helper/helper';

function Password() {
  const [pass, setPass] = useState('')
  const username = useSelector(state => state?.user?.username)
  const [{isLoading, apiData, serverError}] = useFetch(`user/${username}`)
  const navigate = useNavigate()

  let name
  const input=(e)=>{
    name = e.target.value
    setPass(name)
  }

  const submit=()=>{
    if(pass == ""){
      toast.error("Password Required")
    }
    else if(pass.includes(' ')){
        toast.error("Invalid Password, Enter password without spaces")
    }
    else{
      const loginPromise = login({username, password: pass})

      toast.promise(loginPromise,{
        loading: "Verifying...",
        success: <b>Login successful...</b>,
        error: <b>Password does not match</b>
      })

      loginPromise.then(res =>{
        const token = res.data.token
        localStorage.setItem('token',token)
        navigate('/profile')
      })
    }
  }
  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center my-[30px]'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>{`Hello ${username}`}</h4>
            <span className='py-3 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <div>
              <div className='profile flex justify-center py-4'>
                  <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input  className={styles.textbox} type="text" placeholder='Password' value={pass}  onChange={input}/>
                  <button className={styles.btn} onClick={submit}>Sign in</button>
              </div>

              <div className="text-center py-2">
                <span className='text-gray-500'>Forgot Password?  <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
              </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Password