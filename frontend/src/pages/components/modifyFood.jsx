import { useState, useEffect } from 'react';
import axios from 'axios';

import '../../style/components/modifyfood.css';

export default function ModifyFood() {
  const [establishments, setEstablishments] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [averageRating, setAverageRating] = useState('');
  const [foodType, setFoodType] = useState('');
  const [establishmentId, setEstablishmentId] = useState('');
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  useEffect(() => {
    async function fetchEstablishments() {
      try {
        const response = await axios.get('http://localhost:5000/estabs');
        setEstablishments(response.data);
      } catch (error) {
        console.error('Error fetching establishments:', error);
      }
    }

    async function fetchFoodItems() {
      try {
        const response = await axios.get('http://localhost:5000/food-item');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    }

    fetchEstablishments();
    fetchFoodItems();
  }, []);

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/add-food-item', {
        establishmentId,
        name,
        price,
        averageRating,
        foodType,
      });
      alert('Food item added');
      setName('');
      setPrice('');
      setAverageRating('');
      setFoodType('');
      setEstablishmentId('');

      location.reload();
    } catch (error) {
      console.error('Error adding food item:', error);
      alert('Error adding food item');
    }
  };

  const handleUpdateFoodItem = async (e) => {
    e.preventDefault();
    if (!selectedFoodItem) {
      alert('Please select a food item to update');
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/update-food-item/${selectedFoodItem.FoodItemID}`,
        {
          name,
          price,
          averageRating,
          foodType,
        }
      );
      alert('Food item updated');
      setName('');
      setPrice('');
      setAverageRating('');
      setFoodType('');
      setSelectedFoodItem(null);

      location.reload();
    } catch (error) {
      console.error('Error updating food item:', error);
      alert('Error updating food item');
    }
  };

  const handleDeleteFoodItem = async (e) => {
    e.preventDefault();
    if (!selectedFoodItem) {
      alert('Please select a food item to delete');
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/delete-food-item/${selectedFoodItem.FoodItemID}`
      );
      alert('Food item deleted');
      setSelectedFoodItem(null);
      location.reload();
    } catch (error) {
      console.error('Error deleting food item:', error);
      alert('Error deleting food item');
    }
  };

  const handleFoodItemSelect = (e) => {
    const foodItemId = e.target.value;
    const foodItem = foodItems.find((item) => item.FoodItemID == foodItemId);
    setSelectedFoodItem(foodItem);
    setName(foodItem?.Name || '');
    setPrice(foodItem?.Price || '');
    setAverageRating(foodItem?.AverageRating || '');
    setFoodType(foodItem?.FoodType || '');
  };

  return (
    <div className="modifyfood-container">
      <form onSubmit={handleAddFoodItem}>
        <h2>Add Food Item</h2>
        <div className="same-line">
          <select
            onChange={(e) => setEstablishmentId(e.target.value)}
            value={establishmentId}
          >
            <option value="" disabled>
              Select an establishment
            </option>
            {establishments.map((establishment) => (
              <option
                key={establishment.EstablishmentID}
                value={establishment.EstablishmentID}
              >
                {establishment.Name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Average Rating"
            value={averageRating}
            onChange={(e) => setAverageRating(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Food Type"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </div>
      </form>

      <form onSubmit={handleUpdateFoodItem}>
        <h2>Update Food Item</h2>
        <div className="same-line">
          <select
            onChange={handleFoodItemSelect}
            value={selectedFoodItem?.FoodItemID || ''}
          >
            <option value="" disabled>
              Select a food item to update
            </option>
            {foodItems.map((item) => (
              <option key={item.FoodItemID} value={item.FoodItemID}>
                {item.Name}
              </option>
            ))}
          </select>
          {selectedFoodItem && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Average Rating"
                value={averageRating}
                onChange={(e) => setAverageRating(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Food Type"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                required
              />
              <button type="submit">Update</button>
            </>
          )}
        </div>
      </form>

      <form onSubmit={handleDeleteFoodItem}>
        <h2>Delete Food Item</h2>
        <div className="same-line">
          <select
            onChange={handleFoodItemSelect}
            value={selectedFoodItem?.FoodItemID || ''}
          >
            <option value="" disabled>
              Select a food item to delete
            </option>
            {foodItems.map((item) => (
              <option key={item.FoodItemID} value={item.FoodItemID}>
                {item.Name}
              </option>
            ))}
          </select>
          {selectedFoodItem && <button type="submit">Delete</button>}
        </div>
      </form>
    </div>
  );
}
