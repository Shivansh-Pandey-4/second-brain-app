import SideBar from './components/SideBar';
import Body from './components/Body';
import Signup from './components/Signup';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Signin from './components/Signin';

function App() {

  return (
    <>
      <div className='grid grid-cols-10 '>
        <div className='col-span-2'>
          <SideBar/>
        </div>
        <div className='col-span-8'>
          <Body/>
        </div>
      </div>
    </>
  )
}

const appRouter = createBrowserRouter([
     {
       path : "/",
       element : <App/>
     },
     {
       path : "/signup",
       element : <Signup/>
     },
     {
       path : "/signin",
       element : <Signin/>
     }
])

export default appRouter;
