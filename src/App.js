import './App.css';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import supabase from './config';
import storgeUtils from './utils/storageUtils';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    //storgeUtils.removeUser()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()

  }, []);
  if (!storgeUtils.getSession() || !session) {

  }
  else if (session.expires_at > storgeUtils.getSession().expires_at) {
    storgeUtils.removeSession()
    storgeUtils.removeUser()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='MyApp'>
        <RouterProvider router={router} />
      </div>
    </LocalizationProvider>

  );
}

export default App;
