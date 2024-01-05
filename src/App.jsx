import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Username from './components/Username'
import NotFound from './components/NotFound'
import Recovery from './components/Recovery'
import Password from './components/Password'
import Reset from './components/Reset'
import Profile from './components/Profile'
import Register from './components/Register'
import MainLayout from './components/MainLayout'
import Box1 from './components/Box1'
import Box2 from './components/Box2'
import { Authorization, UserProtect} from './middleware/auth'
// import 'dotenv/config'

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
        { path : '/box1', element : <Box1/> },
        { path : '/box2', element : <Box2/> },
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