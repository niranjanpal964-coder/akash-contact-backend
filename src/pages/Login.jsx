import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email, 
        password
      })
      localStorage.setItem('token', res.data.token)
      toast.success('Login Success! Hash মিলে গেছে 🔐')
      console.log('User:', res.data.user)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login Failed')
    }
  }                                                   
  
  return (
    <div style={{padding: 20, maxWidth: 400, margin: 'auto'}}>
      <h2>MLM Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{width: '100%', padding: 12, marginBottom: 10}}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{width: '100%', padding: 12, marginBottom: 10}}
          required
        />
        <button type="submit" style={{width: '100%', padding: 12}}>
          Login
        </button>
      </form>
    </div>
  )
}
