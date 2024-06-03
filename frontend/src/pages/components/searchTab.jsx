import { useState, useEffect } from 'react';
import axios from 'axios';

import '../../style/components/searchtab.css';

export default function SearchTab() {
  const [establishmentResults, setEstablishmentResults] = useState([]);
  const [foodItemResults, setFoodItemResults] = useState([]);
  const [estabReviewResults, setEstabReviewResults] = useState([]);
  const [foodReviewResults, setFoodReviewResults] = useState([]);
  const [establishmentKeyword, setEstablishmentKeyword] = useState('');
  const [foodItemKeyword, setFoodItemKeyword] = useState('');
  const [estabReviewKeyword, setEstabReviewKeyword] = useState('');
  const [foodReviewKeyword, setFoodReviewKeyword] = useState('');
  const [foodTypes, setFoodTypes] = useState([]);
  const [selectedFoodType, setSelectedFoodType] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    fetchFoodTypes();
  }, []);

  const fetchFoodTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/type');
      setFoodTypes(response.data);
    } catch (error) {
      console.error('Error fetching food types:', error);
    }
  };

  const handleFoodTypeChange = (event) => {
    setSelectedFoodType(event.target.value);
  };

  const handlePriceFilter = async (priceRange) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/food-item/price/${priceRange}`
      );
      setFoodItemResults(response.data);
    } catch (error) {
      console.error('Error fetching food items by price range:', error);
    }
  };

  const handleEstablishmentSearch = async () => {
    try {
      let url = `http://localhost:5000/search-establishments/${establishmentKeyword}`;
      if (selectedFoodType) {
        url += `?foodType=${selectedFoodType}`;
      }
      const response = await axios.get(url);
      setEstablishmentResults(response.data);
    } catch (error) {
      console.error('Error searching establishments:', error);
    }
  };

  const handleFoodItemSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search-food-items/${foodItemKeyword}`
      );
      setFoodItemResults(response.data);
    } catch (error) {
      console.error('Error searching food items:', error);
    }
  };

  const handleEstabReviewSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search-establishment-reviews/${estabReviewKeyword}`
      );
      setEstabReviewResults(response.data);
    } catch (error) {
      console.error('Error searching establishment reviews:', error);
    }
  };

  const handleFoodReviewSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search-food-reviews/${foodReviewKeyword}`
      );
      setFoodReviewResults(response.data);
    } catch (error) {
      console.error('Error searching food reviews:', error);
    }
  };

  return (
    <div className="search-container">
      <div className="double-column column-1">
        <div className="same-line">
          <input
            type="text"
            value={establishmentKeyword}
            onChange={(e) => setEstablishmentKeyword(e.target.value)}
            placeholder="Search Establishments"
          />
          <button onClick={handleEstablishmentSearch}>Search</button>
        </div>
        <div className="same-line">
          <input
            type="text"
            value={foodItemKeyword}
            onChange={(e) => setFoodItemKeyword(e.target.value)}
            placeholder="Search Food Items"
          />
          <select value={selectedFoodType} onChange={handleFoodTypeChange}>
            <option value="">All Food Types</option>
            {foodTypes.map((foodType) => (
              <option key={foodType.id} value={foodType.id}>
                {foodType.FoodType}
              </option>
            ))}
          </select>
          <button onClick={handleFoodItemSearch}>Search</button>
        </div>
        <div className="same-line">
          <input
            type="text"
            value={estabReviewKeyword}
            onChange={(e) => setEstabReviewKeyword(e.target.value)}
            placeholder="Search Establishment Reviews"
          />
          <button onClick={handleEstabReviewSearch}>Search</button>
        </div>
        <div className="same-line">
          <input
            type="text"
            value={foodReviewKeyword}
            onChange={(e) => setFoodReviewKeyword(e.target.value)}
            placeholder="Search Food Reviews"
          />
          <button onClick={handleFoodReviewSearch}>Search</button>
        </div>
      </div>
      <div className="double-column column-2">
        <h2>Establishment Results</h2>
        {establishmentResults.map((establishment) => (
          <li key={establishment.EstablishmentID} className="search-card">
            <p>
              Name: <span className="search-result">{establishment.Name}</span>
            </p>
            <p>
              Address:{' '}
              <span className="search-result">{establishment.Address}</span>
            </p>
            <p>
              Rating:{' '}
              <span className="search-result">
                {establishment.AverageRating}
              </span>
            </p>
          </li>
        ))}
        <div className="same-line">
          <h2>Food Item Results</h2>
          <button onClick={() => handlePriceFilter('high')}>High Price</button>
          <button onClick={() => handlePriceFilter('medium')}>
            Medium Price
          </button>
          <button onClick={() => handlePriceFilter('low')}>Low Price</button>
        </div>
        {foodItemResults.map((foodItem) => (
          <li key={foodItem.FoodItemID} className="search-card">
            <p>
              Name: <span className="search-result">{foodItem.Name}</span>
            </p>
            <p>
              Price: <span className="search-result">{foodItem.Price}</span>
            </p>
            <p>
              Establishment:{' '}
              <span className="search-result">
                {foodItem.EstablishmentName}
              </span>
            </p>
            <p>
              Average Rating:{' '}
              <span className="search-result">{foodItem.AverageRating}</span>
            </p>
          </li>
        ))}
        <h2>Establishment Review Results</h2>
        {estabReviewResults.map((review) => (
          <li key={review.ReviewID} className="search-card">
            <p>
              Establishment:{' '}
              <span className="search-result">{review.EstablishmentName}</span>
            </p>
            <p>
              Reviewer: <span className="search-result">{review.Username}</span>
            </p>
            <p>
              Rating: <span className="search-result">{review.Rating}</span>
            </p>
            <p>
              Date: <span className="search-result">{review.Date}</span>
            </p>
            <p>
              Comment:{' '}
              <span className="search-result">{review.Review_Content}</span>
            </p>
          </li>
        ))}
        <h2>Food Review Results</h2>
        {foodReviewResults.map((review) => (
          <li key={review.ReviewID} className="search-card">
            <p>
              Food Item:{' '}
              <span className="search-result">{review.Name}</span>
            </p>
            <p>
              Reviewer: <span className="search-result">{review.Username}</span>
            </p>
            <p>
              Rating: <span className="search-result">{review.Rating}</span>
            </p>
            <p>
              Date: <span className="search-result">{review.Date}</span>
            </p>
            <p>
              Comment:{' '}
              <span className="search-result">{review.Review_Content}</span>
            </p>
          </li>
        ))}
      </div>
    </div>
  );
}
