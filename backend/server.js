
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './router.js';

const app = express();
const port = 5000;

app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());
router(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
