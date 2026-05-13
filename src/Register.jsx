import { useState } from 'react';
import axios from 'axios';

function Register({ setPage }) {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    referralCode: '' 
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      return alert('Name, Email, Password lagbe');
    }
    
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', form);
      alert(`Register Success! 🎉\nTomar Referral Code: ${res.data.referralCode}`);
      setPage('login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Register Failed');
    }
  };

  return (
    <div style={{padding: 20, maxWidth: 400, margin: 'auto', marginTop: 50}}>
      <h2>MLM Join Koro 🚀</h2>
      <input 
        placeholder="Full Name" 
        value={form.name} 
        onChange={e => setForm({...form, name: e.target.value})} 
        style={{width: '100%', margin: 5, padding: 10, fontSize: 16}} 
      />
      <input 
        placeholder="Email" 
        value={form.email} 
        onChange={e => setForm({...form, email: e.target.value})} 
        style={{width: '100%', margin: 5, padding: 10, fontSize: 16}} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={form.password} 
        onChange={e => setForm({...form, password: e.target.value})} 
        style={{width: '100%', margin: 5, padding: 10, fontSize: 16}} 
      />
      <input 
        placeholder="Referral Code (Jodi Thake)" 
        value={form.referralCode} 
        onChange={e => setForm({...form, referralCode: e.target.value})} 
        style={{width: '100%', margin: 5, padding: 10, fontSize: 16}} 
      />
      <button 
        onClick={handleRegister} 
        style={{width: '100%', padding: 12, margin: 5, background: 'green', color: 'white', fontSize: 16, border: 'none'}}
      >
        Join Now - 1000 Taka
      </button>
      <p style={{textAlign: 'center', marginTop: 15}}>
        Account ache? <span onClick={() => setPage('login')} style={{color: 'blue', cursor: 'pointer', fontWeight: 'bold'}}>Login Koro</span>
      </p>
    </div>
  );
}

export default Register;
