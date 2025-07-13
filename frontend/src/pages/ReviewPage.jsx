import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/review`);
      setReviews(res.data.reverse()); // latest first
    } catch (err) {
      toast.error('Failed to load reviews');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.message.trim()) {
      return toast.error('Please add both rating and message');
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/review`, newReview);
      toast.success('Review submitted!');
      setNewReview({ rating: 0, message: '' });
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submit failed');
    }
    setLoading(false);
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
          onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
          placeholder="Share your thoughts..."
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

// styles unchanged from your original

export default ReviewPage;
