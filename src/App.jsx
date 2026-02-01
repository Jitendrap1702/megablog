import { Outlet } from 'react-router-dom';
import './App.css'
import { Footer, Header } from './components/Index';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice.js'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData){
          dispatch(login(userData))
        }else{
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <>
      {/* <h1>A blog with Appwrite</h1> */}
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header/>
          <main>
            TODO : <Outlet/>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  ) : null
}

export default App
