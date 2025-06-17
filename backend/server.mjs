import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.mjs';
import docRoutes from './routes/docRoutes.mjs';
import { DEFAULT_PORT } from './config.mjs';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/docs', docRoutes);

const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
