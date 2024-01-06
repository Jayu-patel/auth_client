import React from 'react'
import { Toaster } from 'react-hot-toast'
import styles from '../styles/Username.module.css';

function Loading() {
  return (
    <div className='container mx-auto'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <div className='flex justify-center items-center my-[30px]'>
              <div className={styles.glass}>
                  <div className='h-[75vh] grid place-items-center'>
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Loading