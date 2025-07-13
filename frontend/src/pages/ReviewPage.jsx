import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, message: '' });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:4001/review');
      setReviews(res.data.reverse()); // show latest first
    } catch (err) {
      toast.error('Failed to load reviews');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.message.trim()) {
      return toast.error('Please add both rating and message');
    }

    try {
      await axios.post('http://localhost:4001/review', newReview);
      toast.success('Review submitted!');
      setNewReview({ rating: 0, message: '' });
      fetchReviews();
    } catch (err) {
      toast.error('Submit failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Reviews</h2>

      {/* Review List */}
      <div style={styles.reviewList}>
        {reviews.length === 0 ? (
          <p style={styles.noReview}>No reviews yet.</p>
        ) : (
          reviews.map((r, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.left}>
                  <strong>Anonymous</strong>
                  <span style={styles.date}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={styles.stars}>{renderStars(r.rating)}</div>
              </div>
              <p style={styles.message}>{r.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.formTitle}>Write a Review</h3>

        <label style={styles.label}>Rating</label>
        <select
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
          style={styles.select}
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
          onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
          placeholder="Share your thoughts..."
          style={styles.textarea}
        ></textarea>

        <button type="submit" style={styles.submitBtn}>
          Submit Review
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

// Daraz-style clean, mobile-friendly styles
const styles = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#222',
  },
  reviewList: {
    marginBottom: 40,
  },
  noReview: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
  card: {
    border: '1px solid #eee',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  stars: {
    fontSize: 18,
  },
  message: {
    fontSize: 15,
    lineHeight: 1.5,
    color: '#444',
  },
  form: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  select: {
    padding: 10,
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  textarea: {
    padding: 10,
    borderRadius: 4,
    border: '1px solid #ccc',
    minHeight: 80,
    fontSize: 14,
  },
  submitBtn: {
    padding: 10,
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#f57224',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    cursor: 'pointer',
  },
};

export default ReviewPage;