import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const backendURL = 'https://website-backend-project.vercel.app';

const ReviewPage = ({ productId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, message: '' });
  const [loading, setLoading] = useState(false);
  const reviewListRef = useRef(null);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${backendURL}/review/${productId}`);
      setReviews(res.data.reverse());
    } catch (err) {
      toast.error('❌ Failed to load reviews');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.message.trim()) {
      return toast.error('Please provide both rating and message');
    }

    setLoading(true);
    try {
      await axios.post(`${backendURL}/review`, {
        ...newReview,
        productId,
        userId,
      });
      toast.success('✅ Review submitted!');
      setNewReview({ rating: 0, message: '' });
      fetchReviews();
      setTimeout(() => {
        reviewListRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submit failed');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🗨️ Customer Reviews</h2>

      {/* Review List */}
      <div style={styles.reviewList} ref={reviewListRef}>
        {reviews.length === 0 ? (
          <p style={styles.noReview}>No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          reviews.map((r, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.left}>
                  <strong>{r.user?.name || 'Anonymous'}</strong>
                  <span style={styles.date}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={styles.stars} aria-label={`Rating: ${r.rating} stars`}>
                  {renderStars(r.rating)}
                </div>
              </div>
              <p style={styles.message}>{r.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <h3 style={styles.formTitle}>📝 Write a Review</h3>

        <label style={styles.label}>Rating</label>
        <select
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: +e.target.value })
          }
          style={styles.select}
          disabled={loading}
        >
          <option value={0}>Select stars</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? 's' : ''}
            </option>
          ))}
        </select>

        <label style={styles.label}>Comment</label>
        <textarea
          value={newReview.message}
          onChange={(e) =>
            setNewReview({ ...newReview, message: e.target.value })
          }
          placeholder="Share your experience..."
          style={styles.textarea}
          disabled={loading}
        ></textarea>

        <button type="submit" style={styles.submitBtn} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

const renderStars = (count) => (
  <span>
    <span style={{ color: '#f5a623' }}>{'★'.repeat(count)}</span>
    <span style={{ color: '#ccc' }}>{'★'.repeat(5 - count)}</span>
  </span>
);

const styles = {
  container: {
    padding: '40px 24px',
    fontFamily: "'Poppins', sans-serif",
    background: '#f7fafc',
    maxWidth: 700,
    margin: '0 auto',
    color: '#2d3748',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '24px',
    textAlign: 'center',
  },
  reviewList: {
    marginBottom: '40px',
  },
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
  },
  date: {
    color: '#718096',
    fontSize: '13px',
  },
  stars: {
    fontSize: '16px',
  },
  message: {
    marginTop: '8px',
    fontSize: '15px',
  },
  noReview: {
    color: '#718096',
    fontSize: '15px',
    textAlign: 'center',
  },
  form: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
    fontSize: '14px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    marginBottom: '20px',
    fontSize: '15px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    height: '100px',
    marginBottom: '20px',
    fontSize: '15px',
    resize: 'vertical',
  },
  submitBtn: {
    padding: '12px 24px',
    background: '#2d3748',
    color: '#fff',
    fontWeight: 600,
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: '0.3s',
  },
};

export default ReviewPage;
