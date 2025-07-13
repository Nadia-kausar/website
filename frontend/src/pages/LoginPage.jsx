import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const LoginPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const backendURL = import.meta.env.VITE_API_URL || 'https://website-backend-project.vercel.app';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${backendURL}/user/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      if (res.data?.user) {
        localStorage.setItem('Users', JSON.stringify(res.data.user));
        login(res.data.user);
        toast.success('✅ Login successful');
        setCurrentPage('home');
      } else {
        toast.error('❌ Invalid credentials');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Login failed');
    }

    setLoading(false);
  };

  const styles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: "'Poppins', sans-serif",
      padding: '20px',
    },
    form: {
      backgroundColor: '#111',
      padding: '40px',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '24px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '12px 0',
      borderRadius: '8px',
      border: '1px solid #333',
      backgroundColor: '#222',
      color: '#fff',
      fontSize: '14px',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: loading ? '#aaa' : '#fff',
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: '0.3s ease',
    },
    switchText: {
      marginTop: '16px',
      textAlign: 'center',
      fontSize: '14px',
    },
    switchLink: {
      color: '#1e90ff',
      cursor: 'pointer',
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login to Your Account</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={styles.input}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.input}
          required
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={styles.switchText}>
          Don&apos;t have an account?{' '}
          <span onClick={() => setCurrentPage('signup')} style={styles.switchLink}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
