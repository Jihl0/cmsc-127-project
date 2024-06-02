import React, { useState } from 'react';
import axios from 'axios';

function SearchTab() {
    const [establishmentResults, setEstablishmentResults] = useState([]);
    const [foodItemResults, setFoodItemResults] = useState([]);
    const [estabReviewResults, setEstabReviewResults] = useState([]);
    const [foodReviewResults, setFoodReviewResults] = useState([]);
    const [establishmentKeyword, setEstablishmentKeyword] = useState('');
    const [foodItemKeyword, setFoodItemKeyword] = useState('');
    const [estabReviewKeyword, setEstabReviewKeyword] = useState('');
    const [foodReviewKeyword, setFoodReviewKeyword] = useState('');

    const handleEstablishmentSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search-establishments/${establishmentKeyword}`);
            setEstablishmentResults(response.data);
        } catch (error) {
            console.error('Error searching establishments:', error);
        }
    };

    const handleFoodItemSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search-food-items/${foodItemKeyword}`);
            setFoodItemResults(response.data);
        } catch (error) {
            console.error('Error searching food items:', error);
        }
    };

    const handleEstabReviewSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search-establishment-reviews/${estabReviewKeyword}`);
            setEstabReviewResults(response.data);
        } catch (error) {
            console.error('Error searching establishment reviews:', error);
        }
    };

    const handleFoodReviewSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search-food-reviews/${foodReviewKeyword}`);
            setFoodReviewResults(response.data);
        } catch (error) {
            console.error('Error searching food reviews:', error);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={establishmentKeyword}
                    onChange={(e) => setEstablishmentKeyword(e.target.value)}
                    placeholder="Search Establishments"
                />
                <button onClick={handleEstablishmentSearch}>Search Establishments</button>
            </div>
            <div>
                <input
                    type="text"
                    value={foodItemKeyword}
                    onChange={(e) => setFoodItemKeyword(e.target.value)}
                    placeholder="Search Food Items"
                />
                <button onClick={handleFoodItemSearch}>Search Food Items</button>
            </div>
            <div>
                <input
                    type="text"
                    value={estabReviewKeyword}
                    onChange={(e) => setEstabReviewKeyword(e.target.value)}
                    placeholder="Search Establishment Reviews"
                />
                <button onClick={handleEstabReviewSearch}>Search Establishment Reviews</button>
            </div>
            <div>
                <input
                    type="text"
                    value={foodReviewKeyword}
                    onChange={(e) => setFoodReviewKeyword(e.target.value)}
                    placeholder="Search Food Reviews"
                />
                <button onClick={handleFoodReviewSearch}>Search Food Reviews</button>
            </div>
            <div>
                <h2>Establishment Results</h2>
                <ul>
                    {establishmentResults.map((establishment) => (
                        <li key={establishment.EstablishmentID}>
                            <p>Name: {establishment.Name}</p>
                            <p>Address: {establishment.Address}</p>
                            <p>Rating: {establishment.AverageRating}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Food Item Results</h2>
                <ul>
                    {foodItemResults.map((foodItem) => (
                        <li key={foodItem.FoodItemID}>
                            <p>Name: {foodItem.Name}</p>
                            <p>Price: {foodItem.Price}</p>
                            <p>Establishment: {foodItem.EstablishmentName}</p>
                            <p>Average Rating: {foodItem.AverageRating}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Establishment Review Results</h2>
                <ul>
                    {estabReviewResults.map((review) => (
                        <li key={review.ReviewID}>
                            <p>Establishment: {review.EstablishmentName}</p>
                            <p>Reviewer: {review.Username}</p>
                            <p>Rating: {review.Rating}</p>
                            <p>Date: {review.Date}</p>
                            <p>Comment: {review.Review_Content}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Food Review Results</h2>
                <ul>
                    {foodReviewResults.map((review) => (
                        <li key={review.ReviewID}>
                            <p>Food Item: {review.FoodItemName}</p>
                            <p>Reviewer: {review.Username}</p>
                            <p>Rating: {review.Rating}</p>
                            <p>Date: {review.Date}</p>
                            <p>Comment: {review.Review_Content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchTab;
