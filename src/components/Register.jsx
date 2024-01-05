import React, { useState } from 'react'
import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import convert from '../helper/convert'
import { register } from '../helper/helper';

function Register() {
  const[file, setFile] = useState('')
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    profile: '',
  })

  let name,value
  const input=(e)=>{
    name = e.target.name
    value = e.target.value

    setUser({...user, [name]: value})
  }

  const upload=async(e)=>{
    const base64 = await convert(e.target.files[0]);
    setFile(base64);
    setUser({...user, profile: base64})
  }

  const submit=()=>{
    const {username, email, password} = user
    if(username!="" && email!="" && password!=""){
      if(username.includes(' ') || email.includes(' ') || password.includes(' ')) return toast.error("spaces are invalid")
      else{
        console.log(user)
        const registerPromise = register(user)

        toast.promise(registerPromise,{
          loading: "Creating...",
          success: <b>Register successfully...</b>,
          error: <b>Could not Register.</b>
        })
      }
    }
    else{
      toast.error("Please fill all details")
    }
  }

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center my-[30px]'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-3 text-xl w-2/3 text-center text-gray-500'>
              Happy to join you
            </span>
          </div>

          <div>
              <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                </label>
                <input onChange={upload} type="file" id='profile' name='profile'/>
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input  className={styles.textbox_reg} type="email" placeholder='Email' name='email' value={user.email}  onChange={input}/>
                  <input  className={styles.textbox_reg} type="text" placeholder='Username' name='username' value={user.username}  onChange={input}/>
                  <input  className={styles.textbox_reg} type="password" placeholder='Password' name='password' value={user.password}  onChange={input}/>
                  <button className={styles.btn} onClick={submit}>Sign up</button>
              </div>

              <div className="text-center py-1">
                <span className='text-gray-500'>Already registered?  <Link className='text-red-500' to="/">Login</Link></span>
              </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Register