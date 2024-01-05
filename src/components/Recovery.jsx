import React, { useEffect, useState } from 'react'
import styles from '../styles/Username.module.css';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux';
import { generateOTP, verifyOTP } from '../helper/helper';

function Recovery() {
  const username = useSelector(s => s?.user?.username)
  const [otp, setOtp] = useState('')

  useEffect(()=>{
    const otpPromise = generateOTP(username)

    toast.promise(otpPromise,{
      loading: "Generating yout OTP...",
      success: <b> OTP has been send to your email!</b>,
      error: <b>Problem while generating OTP</b>
    })
  },[username])

  const navigate = useNavigate()

  let name
  const input=(e)=>{
    name = e.target.value
    setOtp(name)
  }

  const submit=async()=>{
    if(otp == ""){
      toast.error("OTP Required")
    }
    else if(otp.includes(' ')){
      toast.error("Invalid OTP, enter OTP without spaces")
    }
    else{
      try{
        const {status} = await verifyOTP({username, code: otp})
        if(status === 201){
          toast.success("verify successfully!")

          setTimeout(()=>{
            return navigate('/reset')
          },400)
        }
      }
      catch(error){
        toast.error("wrong OTP! check your email again")
      }
    }
  }
  const resend=()=>{
    const otpPromise = generateOTP(username)

    toast.promise(otpPromise,{
      loading: "Sending...",
      success: <b>OTP send to your email</b>,
      error: <b>Cant generate otp</b>
    })
  }
  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center my-[70px]'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className='py-3 text-xl w-2/3 text-center text-gray-500'>
              Enter OTP to recover password
            </span>
          </div>

          <div className='pt-[40px]'>
              <div className="textbox flex flex-col items-center gap-6">
                <span className='py-3 text-sm text-left text-gray-500'>Enter 6 digit OTP to your email address.</span>
                <input  className={styles.textbox} type="text" placeholder='OTP' value={otp}  onChange={input}/>
                <button className={styles.btn} onClick={submit}>Recover</button>
              </div>

              <div className="text-center py-2">
                <span className='text-gray-500'>Can't get OTP <Link className='text-red-500' onClick={resend}>Resend</Link></span>
              </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Recovery