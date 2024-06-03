import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ramoskyro0206',
    database: 'project'
});

async function getAllEstablishments(req, res) {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT fe.EstablishmentID, fe.Name, fe.AverageRating, fea.Address
            FROM FOOD_ESTABLISHMENT fe
            LEFT JOIN FOOD_ESTABLISHMENT_ADDRESS fea ON fe.EstablishmentID = fea.EstablishmentID
        `);
        
        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // You can customize the format here
}

async function getEstablishmentReviews(req, res) {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT re.ReviewID, u.Username, fe.Name as EstablishmentName, re.Rating, re.Date, re.Review_Content
            FROM REVIEW_ESTAB re
            JOIN USER u ON re.UserID = u.UserID
            JOIN FOOD_ESTABLISHMENT fe ON re.EstablishmentID = fe.EstablishmentID
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

async function getMonthlyEstablishmentReviews(req, res) {
    try {
        const conn = await pool.getConnection();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const rows = await conn.query(`
            SELECT re.ReviewID, u.Username, fe.Name as EstablishmentName, re.Rating, re.Date, re.Review_Content
            FROM REVIEW_ESTAB re
            JOIN USER u ON re.UserID = u.UserID
            JOIN FOOD_ESTABLISHMENT fe ON re.EstablishmentID = fe.EstablishmentID
            WHERE re.Date >= ?
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

async function getHighRatedEstablishments(req, res) {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
            SELECT fe.EstablishmentID, fe.Name, fe.AverageRating, fea.Address
            FROM FOOD_ESTABLISHMENT fe
            LEFT JOIN FOOD_ESTABLISHMENT_ADDRESS fea ON fe.EstablishmentID = fea.EstablishmentID
            WHERE fe.AverageRating >= 3
        `);
        
        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function addEstablishment(req, res) {
    const { name, averageRating, address } = req.body;
    try {
        const conn = await pool.getConnection();
        const result = await conn.query(`
            INSERT INTO FOOD_ESTABLISHMENT (Name, AverageRating)
            VALUES (?, ?)
        `, [name, averageRating]);
        const establishmentId = result.insertId;
        await conn.query(`
            INSERT INTO FOOD_ESTABLISHMENT_ADDRESS (EstablishmentID, Address)
            VALUES (?, ?)
        `, [establishmentId, address]);
        res.status(201).send('Establishment added');
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function updateEstablishment(req, res) {
    const { establishmentId } = req.params;
    const { name, averageRating, address } = req.body;
    try {
        const conn = await pool.getConnection();
        await conn.query(`
            UPDATE FOOD_ESTABLISHMENT
            SET Name = ?, AverageRating = ?
            WHERE EstablishmentID = ?
        `, [name, averageRating, establishmentId]);
        await conn.query(`
            UPDATE FOOD_ESTABLISHMENT_ADDRESS
            SET Address = ?
            WHERE EstablishmentID = ?
        `, [address, establishmentId]);
        res.status(200).send('Establishment updated');
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function deleteEstablishment(req, res) {
    const { establishmentId } = req.params;
    try {
        const conn = await pool.getConnection();

        // Get all FoodItemIDs for the given establishment
        const foodItemIds = await conn.query(`
            SELECT FoodItemID FROM FOOD_ITEM
            WHERE EstablishmentID = ?
        `, [establishmentId]);

        const foodItemIdList = foodItemIds.map(row => row.FoodItemID);

        if (foodItemIdList.length > 0) {
            // Delete from REVIEW_FOOD
            await conn.batch(`
                DELETE FROM REVIEW_FOOD
                WHERE FoodItemID = ?
            `, foodItemIdList);

            // Delete from FOOD_ITEM_FOOD_TYPE
            await conn.batch(`
                DELETE FROM FOOD_ITEM_FOOD_TYPE
                WHERE FoodItemID = ?
            `, foodItemIdList);

            // Delete from FOOD_ITEM
            await conn.batch(`
                DELETE FROM FOOD_ITEM
                WHERE FoodItemID = ?
            `, foodItemIdList);
        }

        // Delete from REVIEW_ESTAB
        await conn.query(`
            DELETE FROM REVIEW_ESTAB
            WHERE EstablishmentID = ?
        `, [establishmentId]);

        // Delete from FOOD_ESTABLISHMENT_ADDRESS
        await conn.query(`
            DELETE FROM FOOD_ESTABLISHMENT_ADDRESS
            WHERE EstablishmentID = ?
        `, [establishmentId]);

        // Delete from FOOD_ESTABLISHMENT
        await conn.query(`
            DELETE FROM FOOD_ESTABLISHMENT
            WHERE EstablishmentID = ?
        `, [establishmentId]);

        res.status(200).send('Establishment deleted');
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function searchEstablishments(req, res) {
    const { keyword } = req.params;
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
        SELECT e.EstablishmentID, e.Name, a.Address, e.AverageRating
        FROM FOOD_ESTABLISHMENT e JOIN FOOD_ESTABLISHMENT_ADDRESS a on e.EstablishmentID=a.EstablishmentID
        WHERE e.Name LIKE ? 
        `, [`%${keyword}%`]);
        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function searchEstablishmentReviews(req, res) {
    const { keyword } = req.params;
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(`
        SELECT er.ReviewID, u.Username, fe.Name AS EstablishmentName, er.Rating, er.Date, er.Review_Content
        FROM review_estab er
        JOIN USER u ON er.UserID=u.UserID
        JOIN FOOD_ESTABLISHMENT fe ON er.EstablishmentID = fe.EstablishmentID
        WHERE fe.Name LIKE ?
        `, [`%${keyword}%`]);
        res.status(200).json(rows);
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

// Add a new establishment review
async function addEstablishmentReview(req, res) {
    const { userID, establishmentID, rating, date, reviewContent } = req.body;
    try {
        const conn = await pool.getConnection();
        const result = await conn.query(`
            INSERT INTO REVIEW_ESTAB (UserID, EstablishmentID, Rating, Date, Review_Content)
            VALUES (?, ?, ?, ?, ?)
        `, [userID, establishmentID, rating, date, reviewContent]);
        res.status(201).send('Establishment review added successfully');
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

// Update an existing establishment review
async function updateEstablishmentReview(req, res) {
    const reviewID = req.params.reviewID;
    const { rating, reviewContent } = req.body;
    try {
        const conn = await pool.getConnection();
        const result = await conn.query(`
            UPDATE REVIEW_ESTAB
            SET Rating = ?, Review_Content = ?
            WHERE ReviewID = ?
        `, [rating, reviewContent, reviewID]);
        res.status(200).send('Establishment review updated successfully');
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

// Delete an existing establishment review
async function deleteEstablishmentReview(req, res) {
    const reviewID = req.params.reviewID;
    try {
        const conn = await pool.getConnection();
        const result = await conn.query(`
            DELETE FROM REVIEW_ESTAB WHERE ReviewID = ?
        `, [reviewID]);
        res.status(200).send('Establishment review deleted successfully');
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

export { getAllEstablishments, getEstablishmentReviews, getMonthlyEstablishmentReviews, getHighRatedEstablishments, addEstablishment, updateEstablishment, deleteEstablishment, searchEstablishments, searchEstablishmentReviews,
    addEstablishmentReview, updateEstablishmentReview, deleteEstablishmentReview
 };