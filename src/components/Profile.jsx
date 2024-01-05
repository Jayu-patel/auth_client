import React, { useEffect, useState } from 'react'
import styles from '../styles/Username.module.css';
import avatar from '../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import convert from '../helper/convert'
import { useFetch } from '../hooks/fetch.hook';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../helper/helper';

function Profile() {
  const[file, setFile] = useState()
  const [{isLoading, apiData, serverError}] = useFetch()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    profile: '',
  })

  useEffect(() => {
    if (apiData) {
      setUser(prev => ({
        ...prev,
        firstName: apiData.firstName || '',
        lastName: apiData.lastName || '',
        email: apiData.email || '',
        mobile: apiData.mobile || '',
        address: apiData.address || '',
        profile: apiData.profile || '',
      }));
    }
  }, [apiData]);

  const navigate = useNavigate()


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
    const {firstName, lastName, email, mobile, address} = user
    // console.log(firstName,lastName,email)
    console.log(user)
    if(firstName!="" && lastName!="" && email!=""){
      if(
        firstName.includes(' ') || 
        lastName.includes(' ')|| 
        email.includes(' ') || 
        mobile.includes(' ')
      ) return toast.error("spaces are not allowed in name, email and mobile")
      else{
        console.log(user)
        const updaterPromise = updateUser(user)

        toast.promise(updaterPromise,{
          loading: "Updating...",
          success: <b>Your profile is updated...</b>,
          error: <b>Could not Update your profile.</b>
        })
      }
    }
    else{
      toast.error("Please fill all details")
    }
  }

  const logout=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center my-[30px]'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-3 text-xl w-2/3 text-center text-gray-500'>
              You can update the details
            </span>
          </div>

          <div>
              <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={user.profile ||file || avatar} className={styles.profile_img} alt="avatar" />
                </label>
                <input onChange={upload} type="file" id='profile' name='profile'/>
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-[85%] gap-8">
                  <input  className={styles.textbox_reg} type="text" placeholder='First name' name='firstName' value={user.firstName}  onChange={input}/>
                  <input  className={styles.textbox_reg} type="text" placeholder='Last Name' name='lastName' value={user.lastName}  onChange={input}/>
                </div>

                <div className="name flex w-[85%] gap-8">
                  <input  className={styles.textbox_reg} type="text" placeholder='Mobile No.' name='mobile' value={user.mobile}  onChange={input}/>
                  <input  className={styles.textbox_reg} type="email" placeholder='Email' name='email' value={user.email}  onChange={input}/>
                </div>

                {/* <div className="name flex w-3/4 gap-8"> */}
                  <input  className={styles.textbox_reg} type="text" placeholder='Address' name='address' value={user.address}  onChange={input}/>
                  <button className={styles.btn} onClick={submit}>Update</button>
                {/* </div> */}
              </div>

              <div className="text-center py-1">
                <span className='text-gray-500'>come back later?  <Link className='text-red-500' onClick={logout} >Logout</Link></span>
              </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile