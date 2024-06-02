import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ramoskyro0206',
    database: 'project'
});

async function getAllUsers(req, res) {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM user');
        
        res.status(200).json(rows);

        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM user WHERE Email = ?', [email]);

        if (rows.length === 0) {
            res.status(401).send('Invalid email or password');
            return;
        }

        const user = rows[0];

        // Directly compare the provided password with the stored password
        if (password !== user.Password) {
            res.status(401).send('Invalid email or password');
            return;
        }

        res.status(200).send('Login successful');
        
        conn.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}
async function registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
        const conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO user (Username, Email, Password) VALUES (?, ?, ?)', [username, email, password]);

        res.status(201).send('User registered successfully');
        
        conn.end();
    } catch (err) {
        console.error('Internal server error:', err);
        res.status(500).send('Internal server error');
    }
}

export { getAllUsers, loginUser, registerUser };
