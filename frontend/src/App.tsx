import SideBar from './components/SideBar';
import Body from './components/Body';

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

export default App
