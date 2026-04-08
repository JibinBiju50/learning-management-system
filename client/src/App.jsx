import { Outlet } from 'react-router'
import { Navbar } from './components/Navbar'


function App() {
  return(
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
