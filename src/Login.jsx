import { useState } from 'react';
import axios from 'axios';

function Login({ setToken, setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      alert('Login Success');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login Failed');
    }
  };

  return (
    <div style={{padding: 20, maxWidth: 400, margin: 'auto'}}>
      <h2>MLM Login 💎</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{width: '100%', margin: 5, padding: 8}} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{width: '100%', margin: 5, padding: 8}} />
      <button onClick={handleLogin} style={{width: '100%', padding: 10, margin: 5}}>Login</button>
      <p>No Account? <span onClick={() => setPage('register')} style={{color: 'blue', cursor: 'pointer'}}>Register Here</span></p>
    </div>
  );
}
export default Login;
