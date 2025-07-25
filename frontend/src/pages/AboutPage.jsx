import React from 'react';

const AboutPage = () => {
  const styles = {
    page: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f9f9f9',
      color: '#333',
      padding: '30px 16px',
      lineHeight: '1.7',
    },
    pageTitle: {
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '32px',
      fontWeight: '700',
      color: '#111',
    },
    aboutSection: {
      maxWidth: '1150px',
      margin: '0 auto 32px',
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '16px',
      borderBottom: '2px solid #eee',
      paddingBottom: '8px',
      color: '#222',
    },
    paragraph: {
      marginBottom: '1rem',
      fontSize: '1rem',
      color: '#555',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
      marginTop: '20px',
    },
    featureCard: {
      backgroundColor: '#fafafa',
      padding: '18px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      borderLeft: '4px solid #f57224',
      fontSize: '0.95rem',
    },
    teamMember: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    },
    teamImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '1rem',
      border: '2px solid #f0f0f0',
    },
    teamName: {
      fontSize: '1.05rem',
      fontWeight: '600',
      marginBottom: '0.3rem',
      color: '#222',
    },
    teamRole: {
      fontSize: '0.9rem',
      color: '#777',
    },
  };

  const janeDoePhoto = "https://randomuser.me/api/portraits/women/44.jpg";
  const johnSmithPhoto = "https://randomuser.me/api/portraits/men/46.jpg";
  const sarahJohnsonPhoto = "https://randomuser.me/api/portraits/women/65.jpg";

  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>About ShopEasy</h1>

      {/* Our Story */}
      <section style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>Our Story</h2>
        <p style={styles.paragraph}>
          Founded in 2020, <strong>ShopEasy</strong> was born from a passion to simplify the online shopping experience. We recognized that customers wanted a platform that combined quality, trust, and ease — without the complications of confusing interfaces or hidden costs.
        </p>
        <p style={styles.paragraph}>
          What began as a small startup has quickly evolved into a customer-first brand known for curated products, fast delivery, and responsive support. We now serve thousands of satisfied customers across the country.
        </p>
      </section>

      {/* Vision */}
      <section style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>Our Vision</h2>
        <p style={styles.paragraph}>
          We envision a world where shopping online feels as natural and enjoyable as browsing your favorite local market — only better. Our mission is to blend innovation with simplicity and deliver excellence at every click.
        </p>
        <p style={styles.paragraph}>
          Our future includes expanding globally, investing in green logistics, and becoming a household name known for trust and transparency.
        </p>
      </section>

      {/* Core Values */}
      <section style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>Core Values</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <h3>🌟 Quality</h3>
            <p>We handpick products that meet strict quality benchmarks — no compromises, no shortcuts.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>🎯 Simplicity</h3>
            <p>From browsing to checkout, everything is designed for ease and clarity.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>💰 Affordability</h3>
            <p>We believe premium experiences shouldn’t come with premium prices.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>🌱 Sustainability</h3>
            <p>We’re reducing our footprint with eco-conscious packaging and responsible sourcing.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>Meet the Team</h2>
        <p style={styles.paragraph}>
          Behind ShopEasy is a talented team of developers, designers, marketers, and customer care professionals dedicated to making your experience flawless and memorable.
        </p>
        <div style={styles.featuresGrid}>
          <div style={styles.teamMember}>
            <img src={janeDoePhoto} alt="Jane Doe" style={styles.teamImage} />
            <h3 style={styles.teamName}>Jane Doe</h3>
            <p style={styles.teamRole}>Founder & CEO</p>
          </div>
          <div style={styles.teamMember}>
            <img src={johnSmithPhoto} alt="John Smith" style={styles.teamImage} />
            <h3 style={styles.teamName}>John Smith</h3>
            <p style={styles.teamRole}>Head of Operations</p>
          </div>
          <div style={styles.teamMember}>
            <img src={sarahJohnsonPhoto} alt="Sarah Johnson" style={styles.teamImage} />
            <h3 style={styles.teamName}>Sarah Johnson</h3>
            <p style={styles.teamRole}>Customer Experience Lead</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
