import { loginUser, getAllUsers, registerUser } from './controllers/user_controller.js';
import {     getAllEstablishments,
    getEstablishmentReviews,
    getMonthlyEstablishmentReviews,
    getHighRatedEstablishments,
    addEstablishment,
    updateEstablishment,
    deleteEstablishment,
searchEstablishments,
searchEstablishmentReviews } from './controllers/establishment_controller.js';
    import {
        getAllFoodItems,
        getFoodReviews,
        getFoodItemsByEstablishment,
        getFoodTypes,
        getFoodItemsByType,
        getMonthlyFoodReviews,
        getFoodItemsSortedByPrice,
        addFoodItem,
        updateFoodItem,
        deleteFoodItem, 
        searchFoodItems,
        searchFoodReviews,
        Price


    } from './controllers/food_item.js';

const router = (app) => {

    app.post('/login', loginUser);
    app.get('/users', getAllUsers);
    app.post('/register', registerUser);
    app.get('/estabs', getAllEstablishments);
    app.get('/estab-reviews', getEstablishmentReviews);
    app.get('/monthly-estab-reviews', getMonthlyEstablishmentReviews);
    app.get('/high-estab-reviews', getHighRatedEstablishments);
    app.get('/food-reviews', getFoodReviews);
    app.get('/food-items/:establishmentId', getFoodItemsByEstablishment);
    app.get('/food-item', getAllFoodItems);
    app.get('/type', getFoodTypes);
    app.get('/food-items-by-type/:foodType', getFoodItemsByType);
    app.get('/monthly-food-reviews', getMonthlyFoodReviews);
    app.get('/food-items-sorted/:order', getFoodItemsSortedByPrice);
    app.get('/food-item/price/:priceRange', Price);
    app.post('/add-establishment', addEstablishment);
    app.put('/update-establishment/:establishmentId', updateEstablishment);
    app.delete('/delete-establishment/:establishmentId', deleteEstablishment);
    app.post('/add-food-item', addFoodItem);
    app.put('/update-food-item/:foodItemId', updateFoodItem);
    app.delete('/delete-food-item/:foodItemId', deleteFoodItem);
    app.get('/search-establishments/:keyword', searchEstablishments);
    app.get('/search-food-items/:keyword', searchFoodItems);
    app.get('/search-establishment-reviews/:keyword', searchEstablishmentReviews); 
    app.get('/search-food-reviews/:keyword', searchFoodReviews);
    }

export default router;