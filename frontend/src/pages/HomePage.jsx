import React from 'react';

const shortImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80',
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HomePageBW = () => {
  const [width, setWidth] = React.useState(0);
  const [shortHoverIndex, setShortHoverIndex] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  React.useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width <= 768;

  const styles = {
    page: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#fff',
      color: '#111',
      lineHeight: '1.6',
    },
    hero: {
      position: 'relative',
      height: isMobile ? '60vh' : '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden',
      background: '#000',
      padding: isMobile ? '0 1rem' : '0',
    },
    heroImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'brightness(60%)',
      zIndex: 0,
    },
    heroContent: {
      position: 'relative',
      zIndex: 1,
      color: '#fff',
      padding: '0 20px',
      maxWidth: '800px',
    },
    heroTitle: {
      fontSize: isMobile ? '2.4rem' : '3.8rem',
      fontWeight: '700',
      marginBottom: '1rem',
    },
    heroSubtitle: {
      fontSize: isMobile ? '1rem' : '1.4rem',
      fontWeight: '300',
    },
    section: {
      padding: '60px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: '40px',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
    },
    shortImageContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? 'repeat(auto-fit, minmax(120px, 1fr))'
        : 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '16px',
      marginTop: '20px',
    },
    shortImage: {
      width: '100%',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '8px',
      transition: 'transform 0.3s',
      cursor: 'pointer',
    },
    shortImageHover: {
      transform: 'scale(1.05)',
    },
    newsletterForm: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '20px',
      maxWidth: '480px',
      marginInline: 'auto',
    },
    emailInput: {
      padding: '12px 16px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      width: isMobile ? '100%' : '280px',
    },
    subscribeButton: {
      background: '#f57224',
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    successMessage: {
      marginTop: '12px',
      color: '#28a745',
      fontWeight: '600',
      textAlign: 'center',
    },
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1400&q=80"
          alt="Hero background"
          style={styles.heroImage}
        />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>ShopEasy</h1>
          <p style={styles.heroSubtitle}>
            Your one-stop shop for amazing deals & quality products.
          </p>
        </div>
      </section>

      {/* More to Explore */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>More to Explore</h2>
        <div style={styles.shortImageContainer}>
          {shortImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Explore item ${idx + 1}`}
              onMouseEnter={() => setShortHoverIndex(idx)}
              onMouseLeave={() => setShortHoverIndex(null)}
              style={{
                ...styles.shortImage,
                ...(shortHoverIndex === idx ? styles.shortImageHover : {}),
              }}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Subscribe to Our Newsletter</h2>
        <form style={styles.newsletterForm} onSubmit={handleSubscribe} noValidate>
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.emailInput}
            required
          />
          <button type="submit" style={styles.subscribeButton}>
            Subscribe
          </button>
        </form>
        {subscribed && <p style={styles.successMessage}>Thank you for subscribing!</p>}
      </section>
    </div>
  );
};

export default HomePageBW;
