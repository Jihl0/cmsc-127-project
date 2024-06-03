import { useEffect, useState } from 'react';
import axios from 'axios';

import '../../style/components/viewtab.css';

export default function ViewTab() {
  const [establishments, setEstablishments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [foodReviews, setFoodReviews] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [foodTypes, setFoodTypes] = useState([]);
  const [selectedFoodType, setSelectedFoodType] = useState(null);
  const [monthlyReviews, setMonthlyReviews] = useState([]);
  const [highRatedEstablishments, setHighRatedEstablishments] = useState([]);
  const [monthlyFoodReviews, setMonthlyFoodReviews] = useState([]);
  const [sortedFoodItems, setSortedFoodItems] = useState([]);

  useEffect(() => {
    async function fetchEstablishments() {
      try {
        const response = await axios.get('http://localhost:5000/estabs');
        setEstablishments(response.data);
      } catch (error) {
        console.error('Error fetching establishments:', error);
      }
    }

    async function fetchReviews() {
      try {
        const response = await axios.get('http://localhost:5000/estab-reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    async function fetchFoodReviews() {
      try {
        const response = await axios.get('http://localhost:5000/food-reviews');
        setFoodReviews(response.data);
      } catch (error) {
        console.error('Error fetching food reviews:', error);
      }
    }

    async function fetchFoodTypes() {
      try {
        const response = await axios.get('http://localhost:5000/type');
        setFoodTypes(response.data);
      } catch (error) {
        console.error('Error fetching food types:', error);
      }
    }

    async function fetchMonthlyReviews() {
      try {
        const response = await axios.get(
          'http://localhost:5000/monthly-estab-reviews'
        );
        setMonthlyReviews(response.data);
      } catch (error) {
        console.error('Error fetching monthly reviews:', error);
      }
    }

    async function fetchHighRatedEstablishments() {
      try {
        const response = await axios.get(
          'http://localhost:5000/high-estab-reviews'
        );
        setHighRatedEstablishments(response.data);
      } catch (error) {
        console.error('Error fetching high-rated establishments:', error);
      }
    }
    async function fetchMonthlyFoodReviews() {
      try {
        const response = await axios.get(
          'http://localhost:5000/monthly-food-reviews'
        );
        setMonthlyFoodReviews(response.data);
      } catch (error) {
        console.error('Error fetching monthly food reviews:', error);
      }
    }

    fetchEstablishments();
    fetchReviews();
    fetchFoodReviews();
    fetchFoodTypes();
    fetchMonthlyReviews();
    fetchHighRatedEstablishments();
    fetchMonthlyFoodReviews();
  }, []);

  useEffect(() => {
    if (selectedEstablishment) {
      async function fetchFoodItems() {
        try {
          const response = await axios.get(
            `http://localhost:5000/food-items/${selectedEstablishment}`
          );
          setFoodItems(response.data);
        } catch (error) {
          console.error('Error fetching food items:', error);
        }
      }
      fetchFoodItems();
    }
  }, [selectedEstablishment]);

  useEffect(() => {
    if (selectedFoodType) {
      async function fetchFoodItemsByType() {
        try {
          const response = await axios.get(
            `http://localhost:5000/food-items-by-type/${selectedFoodType}`
          );
          setFoodItems(response.data);
        } catch (error) {
          console.error('Error fetching food items by type:', error);
        }
      }
      fetchFoodItemsByType();
    }
  }, [selectedFoodType]);

  const fetchSortedFoodItems = async (order) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/food-items-sorted/${order}`
      );
      setSortedFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching sorted food items:', error);
    }
  };

  return (
    <div className="viewtab-container">
      <div className="floating-container">
      <div className="food-establishments">
        <h2>Food Establishments</h2>
        {establishments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Average Rating</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {establishments.map((establishment) => (
                <tr key={establishment.EstablishmentID}>
                  <td>{establishment.Name}</td>
                  <td>{establishment.AverageRating}</td>
                  <td>{establishment.Address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No establishments available</p>
        )}
      </div>

        <div className="food-reviews">
          <h2>Food Reviews for Establishments</h2>
            {reviews.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Establishment</th>
                  <th>Rating</th>
                  <th>Date</th>
                  <th>Review Content</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.ReviewID}>
                    <td>{review.Username}</td>
                    <td>{review.EstablishmentName}</td>
                    <td>{review.Rating}</td>
                    <td>{new Date(review.Date).toLocaleDateString()}</td>
                    <td>{review.Review_Content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        ) : (<p>No food reviews available</p>)}


          <h2>Food Reviews for Items</h2>
            {foodReviews.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Food Item</th>
                    <th>Rating</th>
                    <th>Date</th>
                    <th>Review Content</th>
                  </tr>
                </thead>
                <tbody>
                  {foodReviews.map((review) => (
                    <tr key={review.ReviewID}>
                      <td>{review.Username}</td>
                      <td>{review.FoodItemName}</td>
                      <td>{review.Rating}</td>
                      <td>{new Date(review.Date).toLocaleDateString()}</td>
                      <td>{review.Review_Content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (<p>No food reviews available</p>)}
        </div>

        <div className="food-items">
          <h2>Food Items Per Establishment</h2>
          <div className="food-items-container">
            <div className="establishment-buttons">
              <div className="same-line">
                {establishments.map((establishment) => (
                  <button
                    key={establishment.EstablishmentID}
                    onClick={() =>
                      setSelectedEstablishment(establishment.EstablishmentID)
                    }
                  >
                    {establishment.Name}
                  </button>
                ))}
              </div>
            </div>
            {selectedEstablishment ? (
              <table>
                <thead>
                  <tr>
                    <th>Food Item</th>
                    <th>Price</th>
                    <th>Average Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {foodItems.map((item) => (
                    <tr key={item.FoodItemID}>
                      <td>{item.FoodItemName}</td>
                      <td>{item.Price}</td>
                      <td>{item.AverageRating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Please select an establishment to view its food items.</p>
            )}
          </div>
        </div>
        <div className="food-types">
          <h2>Food Types</h2>
          <div className="same-line">
            <div className="food-type-buttons">
              {foodTypes.map((type) => (
                <button
                  key={type.FoodType}
                  onClick={() => setSelectedFoodType(type.FoodType)}
                >
                  {type.FoodType}
                </button>
              ))}
            </div>
            {selectedFoodType ? (
              <div className="food-type-container">
                <table>
                  <thead>
                    <tr>
                      <th>Food Type</th>
                      <th>Establishment</th>
                      <th>Food Item</th>
                      <th>Price</th>
                      <th>Average Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodItems.map((item) => (
                      <tr key={item.FoodItemID}>
                        <td>{selectedFoodType}</td>
                        <td>{item.EstablishmentName}</td>
                        <td>{item.FoodItemName}</td>
                        <td>{item.Price}</td>
                        <td>{item.AverageRating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Please select a food type to view its food items.</p>
            )}
          </div>
        </div>
        <div className="monthly-reviews">
          <h2>Monthly Reviews for Establishments</h2>
          {monthlyReviews.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Establishment</th>
                  <th>Rating</th>
                  <th>Date</th>
                  <th>Review Content</th>
                </tr>
              </thead>
              <tbody>
                {monthlyReviews.map((review) => (
                  <tr key={review.ReviewID}>
                    <td>{review.Username}</td>
                    <td>{review.EstablishmentName}</td>
                    <td>{review.Rating}</td>
                    <td>{new Date(review.Date).toLocaleDateString()}</td>
                    <td>{review.Review_Content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (<p>No establishment reviews available</p>)}

        </div>
        <div className="high-rated-establishments">
          <h2>High Rated Establishments (3 and above)</h2>
          {highRatedEstablishments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Average Rating</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {highRatedEstablishments.map((establishment) => (
                  <tr key={establishment.EstablishmentID}>
                    <td>{establishment.Name}</td>
                    <td>{establishment.AverageRating}</td>
                    <td>{establishment.Address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (<p>No establishments available</p>)}
        </div>

        <div className="monthly-food-reviews">
          <h2>Monthly Food Reviews</h2>
          {monthlyFoodReviews.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Food Item</th>
                  <th>Rating</th>
                  <th>Date</th>
                  <th>Review Content</th>
                </tr>
              </thead>
              <tbody>
                {monthlyFoodReviews.map((review) => (
                  <tr key={review.ReviewID}>
                    <td>{review.Username}</td>
                    <td>{review.FoodItemName}</td>
                    <td>{review.Rating}</td>
                    <td>{new Date(review.Date).toLocaleDateString()}</td>
                    <td>{review.Review_Content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (<p>No food reviews available</p>)}
        </div>

        <div className="sorted-food-items">
          <h2>Sorted Food Items by Price</h2>
          <div className="same-line">
            <button onClick={() => fetchSortedFoodItems('asc')}>
              Sort by Price: Low to High
            </button>
            <button onClick={() => fetchSortedFoodItems('desc')}>
              Sort by Price: High to Low
            </button>
          </div>
          {sortedFoodItems.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Establishment</th>
                <th>Food Item</th>
                <th>Price</th>
                <th>Average Rating</th>
              </tr>
            </thead>
            <tbody>
              {sortedFoodItems.map((item) => (
                <tr key={item.FoodItemID}>
                  <td>{item.EstablishmentName}</td>
                  <td>{item.FoodItemName}</td>
                  <td>{item.Price}</td>
                  <td>{item.AverageRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (<p>No food items available</p>)}
        </div>
      </div>
    </div>
  );
}
