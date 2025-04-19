import express from 'express';
import cors from 'cors';
import routes from './routers'
import pool from './config/db';

const app = express();
const port = process.env.PORT || 3001;
try {
    pool.connect();
} catch (error) {
    console.log("🚀 ~ error:", error)
}

app.use(cors());
app.use(express.json());
app.use('/api', routes)


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});