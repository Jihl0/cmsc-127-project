import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ramoskyro0206',
    database: 'project'
});

function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // You can customize the format here
}

async function getAllFoodItems(req, res) {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT fi.FoodItemID, fe.Name as EstablishmentName, fi.Name as FoodItemName, fi.Price, fi.AverageRating
            FROM FOOD_ITEM fi
            JOIN FOOD_ESTABLISHMENT fe ON fi.EstablishmentID = fe.EstablishmentID
        `);
        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function getFoodReviews(req, res) {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT rf.ReviewID, u.Username, fi.Name as FoodItemName, rf.Rating, rf.Date, rf.Review_Content
            FROM REVIEW_FOOD rf
            JOIN USER u ON rf.UserID = u.UserID
            JOIN FOOD_ITEM fi ON rf.FoodItemID = fi.FoodItemID
        `);

        const formattedRows = rows.map(row => ({
            ...row,
            Date: formatDateString(row.Date)
        }));

        res.status(200).json(formattedRows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function getFoodItemsByEstablishment(req, res) {
    const { establishmentId } = req.params;
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT fi.FoodItemID, fe.Name as EstablishmentName, fi.Name as FoodItemName, fi.Price, fi.AverageRating
            FROM FOOD_ITEM fi
            JOIN FOOD_ESTABLISHMENT fe ON fi.EstablishmentID = fe.EstablishmentID
            WHERE fi.EstablishmentID = ?
        `, [establishmentId]);

        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function getFoodTypes(req, res) {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT DISTINCT FoodType FROM FOOD_ITEM_FOOD_TYPE');
        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function getFoodItemsByType(req, res) {
    const { foodType } = req.params;
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT fi.FoodItemID, fe.Name as EstablishmentName, fi.Name as FoodItemName, fi.Price, fi.AverageRating
            FROM FOOD_ITEM fi
            JOIN FOOD_ITEM_FOOD_TYPE fit ON fi.FoodItemID = fit.FoodItemID
            JOIN FOOD_ESTABLISHMENT fe ON fi.EstablishmentID = fe.EstablishmentID
            WHERE fit.FoodType= ?
        `, [foodType]);

        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function getMonthlyFoodReviews(req, res) {
    try {
        const conn = await pool.getConnection();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const rows = await conn.query(`
            SELECT rf.ReviewID, u.Username, fi.Name as FoodItemName, rf.Rating, rf.Date, rf.Review_Content
            FROM REVIEW_FOOD rf
            JOIN USER u ON rf.UserID = u.UserID
            JOIN FOOD_ITEM fi ON rf.FoodItemID = fi.FoodItemID
            WHERE rf.Date >= ?
        `, [oneMonthAgo]);

        const formattedRows = rows.map(row => ({
            ...row,
            Date: formatDateString(row.Date)
        }));

        res.status(200).json(formattedRows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function getFoodItemsSortedByPrice(req, res) {
    const { order } = req.params;
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC';
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT fi.FoodItemID, fe.Name as EstablishmentName, fi.Name as FoodItemName, fi.Price, fi.AverageRating
            FROM FOOD_ITEM fi
            JOIN FOOD_ESTABLISHMENT fe ON fi.EstablishmentID = fe.EstablishmentID
            ORDER BY fi.Price ${sortOrder}
        `);

        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function addFoodItem(req, res) {
    const { establishmentId, name, price, averageRating, foodType } = req.body;
    try {
        const conn = await pool.getConnection();
        const result = await conn.query(`
            INSERT INTO FOOD_ITEM (EstablishmentID, Name, Price, AverageRating)
            VALUES (?, ?, ?, ?)
        `, [establishmentId, name, price, averageRating]);
        const foodItemId = result.insertId;
        await conn.query(`
            INSERT INTO FOOD_ITEM_FOOD_TYPE (FoodItemID, FoodType)
            VALUES (?, ?)
        `, [foodItemId, foodType]);
        res.status(201).send('Food item added');
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function updateFoodItem(req, res) {
    const { foodItemId } = req.params;
    const { name, price, averageRating, foodType } = req.body;
    try {
        const conn = await pool.getConnection();
        await conn.query(`
            UPDATE FOOD_ITEM
            SET Name = ?, Price = ?, AverageRating = ?
            WHERE FoodItemID = ?
        `, [name, price, averageRating, foodItemId]);
        await conn.query(`
            UPDATE FOOD_ITEM_FOOD_TYPE
            SET FoodType = ?
            WHERE FoodItemID = ?
        `, [foodType, foodItemId]);
        res.status(200).send('Food item updated');
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function deleteFoodItem(req, res) {
    const { foodItemId } = req.params;
    try {
        const conn = await pool.getConnection();
        await conn.query(`
            DELETE FROM REVIEW_FOOD
            WHERE FoodItemID = ?
        `, [foodItemId]);
        await conn.query(`
            DELETE FROM FOOD_ITEM_FOOD_TYPE
            WHERE FoodItemID = ?
        `, [foodItemId]);
        await conn.query(`
            DELETE FROM FOOD_ITEM
            WHERE FoodItemID = ?
        `, [foodItemId]);
        res.status(200).send('Food item deleted');
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function searchFoodItems(req, res) {
    const { keyword } = req.params;
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
        SELECT fi.FoodItemID, fi.Name, fi.Price, fi.AverageRating, fe.Name AS EstablishmentName
        FROM FOOD_ITEM fi
        JOIN FOOD_ESTABLISHMENT fe ON fi.EstablishmentID = fe.EstablishmentID
        WHERE fi.Name LIKE ?
    `, [`%${keyword}%`]);
        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function searchFoodReviews(req, res) {
    const { keyword } = req.params;
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
        SELECT rf.ReviewID, u.Username, fi.Name AS FoodItemName, rf.Rating, rf.Date, rf.Review_Content
        FROM REVIEW_FOOD rf
        JOIN USER u ON rf.UserID = u.UserID
        JOIN FOOD_ITEM fi ON rf.FoodItemID = fi.FoodItemID
        WHERE fi.Name LIKE ?
    `, [`%${keyword}%`]);
        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

export { getAllFoodItems, getFoodReviews, getFoodItemsByEstablishment, getFoodTypes, getFoodItemsByType, getMonthlyFoodReviews, getFoodItemsSortedByPrice, addFoodItem, updateFoodItem, deleteFoodItem, searchFoodItems, searchFoodReviews };