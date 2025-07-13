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
    padding: '1.5rem 1rem',
    borderBottom: '2px solid #333333'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    textAlign: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    flexGrow: 1
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexGrow: 2
  },
  cartIcon: {
    backgroundColor: '#333333',
    padding: '0.6rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap'
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
    padding: '0 1rem',
    display: 'flex',
    listStyle: 'none',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.8rem'
  },
  navItem: {
    margin: 0
  },
  navLink: {
    display: 'block',
    padding: '0.7rem 1.2rem',
    textDecoration: 'none',
    color: '#000000',
    backgroundColor: 'transparent',
    border: '2px solid transparent',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.3s',
    borderRadius: '6px',
    fontWeight: 'bold',
    textAlign: 'center',
    whiteSpace: 'nowrap'
  },
  navLinkActive: {
    backgroundColor: '#000000',
    color: '#ffffff',
    borderColor: '#000000'
  },

  // Main Content Styles
  main: {
    flex: 1,
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 1rem',
    width: '100%'
  },

  // Page Title
  pageTitle: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#000000'
  },

  // Hero Section
  hero: {
    textAlign: 'center',
    padding: '2.5rem 1rem',
    backgroundColor: '#f8f8f8',
    margin: '2rem 0',
    borderRadius: '8px'
  },
  heroContent: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  heroSubtitle: {
    fontSize: '1rem',
    marginBottom: '2rem',
    color: '#666666'
  },
  heroButton: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
    maxWidth: '220px'
  },

  // Features
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },

  // Products
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  // Responsive Product Card
productCard: {
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '1rem',
  textAlign: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  transition: 'transform 0.2s ease',
  cursor: 'pointer',
},

productImage: {
  width: '100%',
  height: '150px',
  backgroundColor: '#f9f9f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  overflow: 'hidden',
  marginBottom: '1rem'
},

productImageTag: {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
},

productName: {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  wordWrap: 'break-word'
},

productPrice: {
  fontSize: '1rem',
  color: '#444444',
  marginBottom: '1rem'
},

addToCartButton: {
  backgroundColor: '#000000',
  color: '#ffffff',
  border: 'none',
  padding: '0.8rem',
  fontSize: '1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  width: '100%',
  marginTop: 'auto'
}
,

  // Footer
  footer: {
    backgroundColor: '#000000',
    color: '#ffffff',
    marginTop: 'auto'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 1rem 1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem'
  },
  footerBottom: {
    borderTop: '1px solid #333333',
    padding: '1.5rem',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  }
};
