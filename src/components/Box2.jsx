import React from 'react'
import { useNavigate, Link } from 'react-router-dom'


function Box2() {
    const navigate = useNavigate()
    return (
      <div className='w-[100vw]'>
          <div className='w-[100vw] bg-black sticky top-0'>
                {/* <Link to={'/box1'} preventScrollReset> */}
                    <button className='p-2 bg-white' onClick={()=>{navigate('/box1')}}>BOX_2</button>
                {/* </Link> */}
          </div>
          <div className='bg-red-500 w-[100vw] h-[150vh]'>
  
          </div>
          <div className='bg-purple-400 w-[100vw] h-[150vh]'>
  
          </div>
          <div className='bg-green-500 w-[100vw] h-[150vh]'>
  
          </div>
      </div>
  )
}

export default Box2