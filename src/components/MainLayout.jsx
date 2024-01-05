import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

function MainLayout() {
  return (
    <>
        <ScrollRestoration
            getKey={(location, matches) => {
            return location.pathname;
        }}
        />
        <Outlet/>
    </>
  )
}

export default MainLayout