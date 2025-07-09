// src/styles/styles.js
export const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },

  // Header Styles
  header: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '2rem 0',
    borderBottom: '2px solid #333333'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'  // ✅ makes header responsive
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
    flexWrap: 'wrap'  // ✅ makes info wrap on small screens
  },
  cartIcon: {
    backgroundColor: '#333333',
    padding: '1rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },

  // Navigation Styles
  navbar: {
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #e0e0e0',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    width: '100%'
  },
  navList: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    listStyle: 'none',
    flexWrap: 'wrap',  // ✅ wrap nav items on small screens
    justifyContent: 'center',
    gap: '1rem'
  },
  navItem: {
    margin: '0'
  },
  navLink: {
    display: 'block',
    padding: '1rem 2rem',
    textDecoration: 'none',
    color: '#000000',
    backgroundColor: 'transparent',
    border: '2px solid transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s',
    borderRadius: '6px',
    fontWeight: 'bold'
  },
  navLinkActive: {
    backgroundColor: '#000000',
    color: '#ffffff',
    borderColor: '#000000'
  },

  // Main Content Styles
  main: {
    flex: '1',
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 2rem',
    width: '100%'
  },

  // Page Title
  pageTitle: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    textAlign: 'center',
    color: '#000000'
  },

  // Hero Section
  hero: {
    textAlign: 'center',
    padding: '5rem 2rem',
    backgroundColor: '#f8f8f8',
    margin: '3rem 0',
    borderRadius: '8px'
  },
  heroContent: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1.5rem'
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2.5rem',
    color: '#666666'
  },
  heroButton: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '1.2rem 2.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },

  // Features
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2.5rem',
    marginTop: '2.5rem'
  },

  // Products
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2.5rem',
    marginTop: '2.5rem'
  },

  // Footer
  footer: {
    backgroundColor: '#000000',
    color: '#ffffff',
    marginTop: 'auto'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2.5rem'
  },
  footerBottom: {
    borderTop: '1px solid #333333',
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  }
}