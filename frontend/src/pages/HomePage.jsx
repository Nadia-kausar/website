import React from 'react';

const HomePageBW = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [productHoverIndex, setProductHoverIndex] = React.useState(null);
  const [shortImageHoverIndex, setShortImageHoverIndex] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  React.useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
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
      padding: isMobile ? '0 10px' : '0 20px',
      maxWidth: isMobile ? '90%' : '800px',
    },
    heroTitle: {
      fontSize: isMobile ? '2.2rem' : '3.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
    },
    heroSubtitle: {
      fontSize: isMobile ? '1rem' : '1.3rem',
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
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? 'repeat(auto-fit, minmax(160px, 1fr))'
        : 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px',
    },
    productCard: {
      background: '#fafafa',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      padding: '16px',
      textAlign: 'center',
      transition: 'transform 0.3s, box-shadow 0.3s',
      outline: 'none',
      cursor: 'pointer',
    },
    productCardHover: {
      transform: 'translateY(-6px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    },
    productImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '16px',
    },
    productTitle: {
      fontWeight: '600',
      fontSize: '1.1rem',
      marginBottom: '8px',
    },
    productPrice: {
      color: '#f57224',
      fontWeight: '500',
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
      outline: 'none',
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
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    emailInput: {
      padding: '12px 16px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      width: isMobile ? '100%' : '280px',
      maxWidth: '100%',
    },
    subscribeButton: {
      background: '#f57224',
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background 0.3s',
    },
    successMessage: {
      marginTop: '12px',
      color: '#28a745',
      fontWeight: '600',
      textAlign: 'center',
    },
  };

  const featuredProducts = [
    {
      id: 1,
      title: 'Leather Wallet',
      price: '$49.99',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      title: 'Sunglasses',
      price: '$79.99',
      img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      title: 'Backpack',
      price: '$89.99',
      img: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      title: 'Smart Watch',
      price: '$199.99',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const shortImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80',
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <main>
        <section
          style={styles.hero}
          aria-label="Hero section with site introduction"
        >
          <img
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1400&q=80"
            style={styles.heroImage}
            alt="Hero background"
          />
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>ShopEasy</h1>
            <p style={styles.heroSubtitle}>
              Your one-stop shop for amazing deals & quality products.
            </p>
          </div>
        </section>

        {/* Featured Products */}
        <section
          style={styles.section}
          aria-label="Featured products list"
        >
          <h2 style={styles.sectionTitle}>Featured Products</h2>
          <div style={styles.productsGrid}>
            {featuredProducts.map((product, idx) => (
              <div
                key={product.id}
                tabIndex={0}
                onFocus={() => setProductHoverIndex(idx)}
                onBlur={() => setProductHoverIndex(null)}
                onMouseEnter={() => setProductHoverIndex(idx)}
                onMouseLeave={() => setProductHoverIndex(null)}
                style={{
                  ...styles.productCard,
                  ...(productHoverIndex === idx ? styles.productCardHover : {}),
                }}
                aria-label={`${product.title}, priced at ${product.price}`}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  style={styles.productImage}
                />
                <h3 style={styles.productTitle}>{product.title}</h3>
                <p style={styles.productPrice}>{product.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* More to Explore */}
        <section
          style={styles.section}
          aria-label="More products to explore"
        >
          <h2 style={styles.sectionTitle}>More to Explore</h2>
          <div style={styles.shortImageContainer}>
            {shortImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Explore product"
                tabIndex={0}
                onFocus={() => setShortImageHoverIndex(idx)}
                onBlur={() => setShortImageHoverIndex(null)}
                onMouseEnter={() => setShortImageHoverIndex(idx)}
                onMouseLeave={() => setShortImageHoverIndex(null)}
                style={{
                  ...styles.shortImage,
                  ...(shortImageHoverIndex === idx ? styles.shortImageHover : {}),
                }}
                loading="lazy"
              />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section
          style={styles.section}
          aria-label="Customer testimonials"
        >
          <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
          <div style={styles.productsGrid}>
            <article style={styles.productCard}>
              <p>"Fast delivery & amazing quality!"</p>
              <strong>- Sarah J.</strong>
            </article>
            <article style={styles.productCard}>
              <p>"Always find what I need — love it!"</p>
              <strong>- Mike T.</strong>
            </article>
            <article style={styles.productCard}>
              <p>"Excellent support and service."</p>
              <strong>- Emily R.</strong>
            </article>
          </div>
        </section>

        {/* Newsletter */}
        <section
          style={styles.section}
          aria-label="Subscribe to newsletter"
        >
          <h2 style={styles.sectionTitle}>Stay Updated</h2>
          <p style={{ textAlign: 'center' }}>
            Subscribe for deals, updates & more.
          </p>
          <form style={styles.newsletterForm} onSubmit={handleSubscribe} noValidate>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.emailInput}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" style={styles.subscribeButton}>
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p style={styles.successMessage} role="alert">
              Thank you for subscribing!
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePageBW;
