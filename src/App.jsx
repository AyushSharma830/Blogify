import { useEffect, useState } from 'react'
import './App.css'
import conf from './conf/conf.js'
import { useDispatch } from 'react-redux'
import authService from './appwrrite/auth.js'
import { login, logout } from './store/authSlice.js'
import { Header, Footer } from './components/index.js'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true); //to check if we are in loading data like an api call to DB and if not then we will display that data
  const dispatch = useDispatch();

  useEffect(() => {   //making a function to  get current user and dispatch the data to login or logout resp.
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        }
        else {
          dispatch(logout());
        }
      }
      )
      .finally(() => setLoading(false))   //finally is always run at end no matter .then runs or .catch runs we set loading to false as we have got the status of current user.
  }, [])

  return !loading ? ( //this is simple if else that is if loading is true display no data and if true display the given contents
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          Todo : <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
