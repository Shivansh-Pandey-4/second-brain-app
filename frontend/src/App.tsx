import Signup from './components/Signup';
import { createBrowserRouter } from 'react-router-dom';
import Signin from './components/Signin';
import PublicContent from './components/PublicContent';
import ErrorPage from './components/ErrorPage';
import ProtectedPage from './components/ProtectedPage';
import UnProtectedPage from './components/UnProtectedPage';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div>
      <Home />
    </div>
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
    path: "/dashboard",
    element: (<ProtectedPage>
      <Dashboard />
    </ProtectedPage>)
  },
  {
    path: "/signup",
    element: (
      <UnProtectedPage>
        <Signup />
      </UnProtectedPage>
    )
  },
  {
    path: "/signin",
    element: (
      <UnProtectedPage>
        <Signin />
      </UnProtectedPage>
    )
  },
  {
    path: "/brain/:hashString",
    element: <PublicContent />
  },
])

export default appRouter;
