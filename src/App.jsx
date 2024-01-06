import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Username from './components/Username'
import NotFound from './components/NotFound'
import Recovery from './components/Recovery'
import Password from './components/Password'
import Reset from './components/Reset'
import Profile from './components/Profile'
import Register from './components/Register'
import MainLayout from './components/MainLayout'
import { Authorization, UserProtect} from './middleware/auth'

function App() {
  const router = createBrowserRouter([
    { path: '/',
      element: <MainLayout/>,
      children: [
        { path : '/', element : <Username/> },
        { path : '/register', element :   <Register/>},
        { path : '/password', element : <UserProtect><Password/></UserProtect>},
        { path : '/recovery', element : <Recovery/> },
        { path : '/reset', element : <Reset/> },
        { path : '/profile', element : <Authorization><Profile/></Authorization> },
        { path : '*', element : <NotFound/> },]
    }
  ])
  return (
      <>
        <RouterProvider router={router}>
        </RouterProvider>    
      </>
  )
}

export default App