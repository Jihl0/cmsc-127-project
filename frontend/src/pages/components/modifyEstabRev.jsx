import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../style/components/modifyestab.css';

function ModifyEstabReview() {
  const [userID, setUserID] = useState('');
  const [establishmentID, setEstablishmentID] = useState('');
  const [rating, setRating] = useState('');
  const [date, setDate] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [establishments, setEstablishments] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedReviewID, setSelectedReviewID] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get('http://localhost:5000/users');
        setUsers(userResponse.data);

        const establishmentResponse = await axios.get('http://localhost:5000/estabs');
        setEstablishments(establishmentResponse.data);

        const reviewResponse = await axios.get('http://localhost:5000/estab-reviews');
        setReviews(reviewResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/add-establishment-review', {
        userID,
        establishmentID,
        rating,
        date,
        reviewContent
      });
      alert('Establishment review added successfully');
      // Reset form fields after successful submission
      setUserID('');
      setEstablishmentID('');
      setRating('');
      setDate('');
      setReviewContent('');
      location.reload();
    } catch (error) {
      console.error('Error adding establishment review:', error);
      alert('Error adding establishment review');
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update-establishment-review/${selectedReviewID}`, {
        rating,
        reviewContent
      });
      alert('Establishment review updated successfully');
      // Reset form fields after successful submission
      setRating('');
      setReviewContent('');
      location.reload();
    } catch (error) {
      console.error('Error updating establishment review:', error);
      alert('Error updating establishment review');
    }
  };

  const handleDeleteReview = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/delete-establishment-review/${selectedReviewID}`);
      alert('Establishment review deleted successfully');
      // Reset form fields after successful deletion
      setRating('');
      setReviewContent('');
      location.reload();
    } catch (error) {
      console.error('Error deleting establishment review:', error);
      alert('Error deleting establishment review');
    }
  };

  return (
    <div className="modifyestab-container">
      <form onSubmit={handleAddReview}>
        <h2>Add Establishment Review</h2>
        <div className="same-line estab-inputs">
          <select
            value={establishmentID}
            onChange={(e) => setEstablishmentID(e.target.value)}
            required
          >
            <option value="" disabled>Select an Establishment</option>
            {establishments.map((establishment) => (
              <option key={establishment.EstablishmentID} value={establishment.EstablishmentID}>
                {establishment.Name}
              </option>
            ))}
          </select>
          <select
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          >
            <option value="" disabled>Select a User</option>
            {users.map((user) => (
              <option key={user.UserID} value={user.UserID}>
                {user.Username}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            required
          />
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Review Content"
            required
          />
          <button type="submit">Add Review</button>
        </div>
      </form>

      <form onSubmit={handleUpdateReview}>
        <h2>Update Establishment Review</h2>
        <div className="same-line estab-inputs">
          <select
            value={selectedReviewID}
            onChange={(e) => setSelectedReviewID(e.target.value)}
            required
          >
            <option value="" disabled>Select a Review to Update</option>
            {reviews.map((review) => (
              <option key={review.ReviewID} value={review.ReviewID}>
                {review.Review_Content}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating"
            required
          />
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Review Content"
            required
          />
          <button type="submit">Update Review</button>
        </div>
      </form>

      <form onSubmit={handleDeleteReview}>
        <h2>Delete Establishment Review</h2>
        <div className="same-line estab-inputs">
          <select
            value={selectedReviewID}
            onChange={(e) => setSelectedReviewID(e.target.value)}
            required
          >
            <option value="" disabled>Select a Review to Delete</option>
            {reviews.map((review) => (
              <option key={review.ReviewID} value={review.ReviewID}>
                {review.Review_Content}
              </option>
            ))}
          </select>
          <button type="submit">Delete Review</button>
        </div>
      </form>
    </div>
  );
}

export default ModifyEstabReview;