import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import docRoutes from './routes/docRoutes.mjs';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/docs', docRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
