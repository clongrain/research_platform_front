import './App.css';
import router from './router';
import { RouterProvider } from 'react-router-dom';
function App() {
  
  return (
    <div className='Myindex' style={{ backgroundColor: '#EFF4F9' }}>
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
