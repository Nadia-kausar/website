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

  const backendURL = import.meta.env.VITE_API_URL || 'https://website-backend-project.vercel.app';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trimStart(),
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fullname, email, password, confirmPassword } = formData;

    if (!fullname || !email || !password || !confirmPassword) {
      toast.error('❗ Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('❗ Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('❗ Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/user/signup`, {
        fullname: fullname.trim(),
        email: email.trim(),
        password: password.trim()
      });

      if (res.data?.user) {
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

        <form onSubmit={handleSignup} style={styles.form} noValidate>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            style={styles.input}
            autoComplete="name"
            aria-label="Full Name"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            autoComplete="email"
            aria-label="Email"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            autoComplete="new-password"
            aria-label="Password"
            required
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            autoComplete="new-password"
            aria-label="Confirm Password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? '#555' : '#fff',
              color: loading ? '#aaa' : '#000',
              cursor: loading ? 'not-allowed' : 'pointer',
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
