import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const SignupPage = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { fullname, email, password, confirmPassword } = formData;

    if (!fullname || !email || !password || !confirmPassword) {
      toast.error('❗ Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('❗ Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error('❗ Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('https://website-backend-project.vercel.app/user/signup', {
        fullname,
        email,
        password
      });

      if (res.data && res.data.user) {
        toast.success('✅ Signup successful! Welcome 🎉');
        localStorage.setItem('Users', JSON.stringify(res.data.user));
        login(res.data.user);
        setCurrentPage('home');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Signup failed');
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>

        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
            style={styles.input}
            autoComplete="name"
            autoFocus
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
            autoComplete="new-password"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
            autoComplete="new-password"
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? '#555' : '#fff',
              color: loading ? '#ccc' : '#000',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#fff';
            }}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            style={styles.linkButton}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: "'Poppins', sans-serif",
    padding: '1rem',
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: '#111',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#222',
    color: '#fff',
  },
  button: {
    padding: '0.85rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  footerText: {
    marginTop: '1.25rem',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#ccc',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#1e90ff',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    textDecoration: 'underline',
  },
};

export default SignupPage;
