import SideBar from './components/SideBar';
import Body from './components/Body';
import Signup from './components/Signup';
import { createBrowserRouter } from 'react-router-dom';
import Signin from './components/Signin';
import PublicContent from './components/PublicContent';
import ErrorPage from './components/ErrorPage';

function App() {

  return (
    <>
      <div className='grid grid-cols-4 md:grid-cols-10 '>
        <div className='col-span-1 md:col-span-2 border-r'>
          <SideBar />
        </div>
        <div className='col-span-3 md:col-span-8'>
          <Body />
        </div>
      </div>
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/brain/:hashString",
    element: <PublicContent />
  },
])

export default appRouter;
