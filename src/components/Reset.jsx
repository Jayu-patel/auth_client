import React, { useState } from 'react'
import styles from '../styles/Username.module.css';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { resetPass } from '../helper/helper';
import { useSelector } from 'react-redux';

function Reset() {
  const username = useSelector(s=> s?.user?.username)
  const [pass, setPass] = useState({
    first: '',
    second: '',
  })

  const navigate = useNavigate()

  let name, value
  const input=(element)=>{
    name = element.target.name
    value = element.target.value
    setPass({...pass, [name]:value})
  }

  const submit=async()=>{
    const {first, second} = pass
    if(first == "" || second == ""){
      toast.error("Password Required")
    }
    else if(first.includes(' ') || second.includes(' ')){
        toast.error("Invalid Password, Enter password without spaces")
    }
    else if(first !== second){
      toast.error("Confirm password must be same as above")
    }
    else{
      const resetPassPromise = resetPass({username,password: pass.first})

      toast.promise(resetPassPromise,{
        loading: "Updating...",
        success: <b>Your password is updated</b>,
        error: <b>Can not update your password</b>
      })

      resetPassPromise.then(()=>{
        navigate("/password")
      })
    }
  }
  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center my-[70px]'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Resest</h4>
            <span className='py-3 text-xl w-2/3 text-center text-gray-500'>
                Enter new password
            </span>
          </div>

          <div className='pb-[40px]'>
              <div className="textbox flex flex-col items-center gap-6">
                  <input  className={styles.textbox} type="text" placeholder='Password' name='first' value={pass.first}  onChange={input}/>
                  <input  className={styles.textbox} type="text" placeholder='Confirm Password' name='second' value={pass.second}  onChange={input}/>
                  <button className={styles.btn} onClick={submit}>Reset</button>
              </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Reset