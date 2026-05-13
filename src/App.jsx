import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [page, setPage] = useState('login');

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (token) return <Dashboard logout={logout} />;
  
  return (
    <div>
      {page === 'login' ? 
        <Login setToken={setToken} setPage={setPage} /> : 
        <Register setPage={setPage} />
      }
    </div>
  );
}
export default App;
