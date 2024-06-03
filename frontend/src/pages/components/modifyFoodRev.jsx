import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../style/components/modifyestab.css';

function ModifyFoodReview() {
  const [userID, setUserID] = useState('');
  const [foodItemID, setFoodItemID] = useState('');
  const [rating, setRating] = useState('');
  const [date, setDate] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedReviewID, setSelectedReviewID] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get('http://localhost:5000/users');
        setUsers(userResponse.data);

        const foodItemResponse = await axios.get('http://localhost:5000/food-item');
        setFoodItems(foodItemResponse.data);

        const reviewResponse = await axios.get('http://localhost:5000/food-reviews');
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
      await axios.post('http://localhost:5000/add-food-review', {
        userID,
        foodItemID,
        rating,
        date,
        reviewContent
      });
      alert('Food review added successfully');
      // Reset form fields after successful submission
      setUserID('');
      setFoodItemID('');
      setRating('');
      setDate('');
      setReviewContent('');
      location.reload();
    } catch (error) {
      console.error('Error adding food review:', error);
      alert('Error adding food review');
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update-food-review/${selectedReviewID}`, {
        rating,
        reviewContent
      });
      alert('Food review updated successfully');
      // Reset form fields after successful submission
      setRating('');
      setReviewContent('');
      location.reload();
    } catch (error) {
      console.error('Error updating food review:', error);
      alert('Error updating food review');
    }
  };

  const handleDeleteReview = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/delete-food-review/${selectedReviewID}`);
      alert('Food review deleted successfully');
      // Reset form fields after successful deletion
      setRating('');
      setReviewContent('');
      location.reload();
    } catch (error) {
      console.error('Error deleting food review:', error);
      alert('Error deleting food review');
    }
  };

  return (
    <div className="modifyestab-container">
      <form onSubmit={handleAddReview}>
        <h2>Add Food Review</h2>
        <div className="same-line estab-inputs">
          <select
            value={foodItemID}
            onChange={(e) => setFoodItemID(e.target.value)}
            required
          >
            <option value="" disabled>Select a Food Item</option>
            {foodItems.map((foodItem) => (
              <option key={foodItem.FoodItemID} value={foodItem.FoodItemID}>
                {foodItem.Name}
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
        <h2>Update Food Review</h2>
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
        <h2>Delete Food Review</h2>
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

export default ModifyFoodReview;
