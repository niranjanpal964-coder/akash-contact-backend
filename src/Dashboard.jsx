import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ logout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      return;
    }

    axios.get('http://localhost:3000/api/auth/profile', {
      headers: { 'x-auth-token': token }
    }).then(res => {
      setUser(res.data);
      setLoading(false);
    }).catch(() => {
      alert('Session expired. Login again');
      logout();
    });
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    alert('Referral Code Copied: ' + user.referralCode);
  };

  const copyLink = () => {
    const link = `${window.location.origin}/register?ref=${user.referralCode}`;
    navigator.clipboard.writeText(link);
    alert('Referral Link Copied!');
  };

  if (loading) return <h2 style={{textAlign: 'center', marginTop: 50}}>Loading...</h2>;
  if (!user) return null;

  return (
    <div style={{padding: 20, maxWidth: 1000, margin: 'auto'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Welcome {user.name} 💎</h1>
        <button onClick={logout} style={{padding: 10, background: 'red', color: 'white', border: 'none'}}>Logout</button>
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 20}}>
        <div style={{border: '2px solid #4CAF50', padding: 20, borderRadius: 10, textAlign: 'center'}}>
          <h3>💰 Wallet Balance</h3>
          <h1 style={{color: '#4CAF50'}}>₹{user.wallet}</h1>
        </div>
        
        <div style={{border: '2px solid #2196F3', padding: 20, borderRadius: 10, textAlign: 'center'}}>
          <h3>📈 Total Earning</h3>
          <h1 style={{color: '#2196F3'}}>₹{user.totalEarning}</h1>
        </div>
        
        <div style={{border: '2px solid #FF9800', padding: 20, borderRadius: 10, textAlign: 'center'}}>
          <h3>🎯 Your Code</h3>
          <h1 style={{color: '#FF9800', fontSize: 20}}>{user.referralCode}</h1>
          <button onClick={copyCode} style={{marginTop: 10, padding: 8}}>Copy Code</button>
        </div>
      </div>

      <div style={{marginTop: 40, padding: 20, background: '#f5f5f5', borderRadius: 10}}>
        <h2>👥 Your Team Structure</h2>
        <div style={{display: 'flex', gap: 40, marginTop: 15, fontSize: 18}}>
          <div>🟢 Left Team: <b>{user.team.left} Members</b></div>
          <div>🔵 Right Team: <b>{user.team.right} Members</b></div>
        </div>
      </div>

      <div style={{marginTop: 30}}>
        <h3>🔗 Your Referral Link:</h3>
        <div style={{display: 'flex', gap: 10, marginTop: 10}}>
          <input 
            value={`${window.location.origin}/register?ref=${user.referralCode}`} 
            readOnly 
            style={{flex: 1, padding: 10, fontSize: 14}}
          />
          <button onClick={copyLink} style={{padding: 10, background: '#9C27B0', color: 'white', border: 'none'}}>Copy Link</button>
        </div>
        <p style={{marginTop: 10, color: 'gray'}}>Ei link share korle proti join e 300 Taka paba</p>
      </div>
    </div>
  );
}

export default Dashboard;
