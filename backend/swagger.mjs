import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import { DEFAULT_PORT } from './config.mjs';

dotenv.config();
const PORT = process.env.PORT || DEFAULT_PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tech Documentation API',
      version: '1.0.0',
      description: 'API for managing technical documentation',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Documents',
        description: 'Document management endpoints',
      },
    ],
  },
  apis: ['./routes/*.mjs'], // Path to the API routes
};

export const specs = swaggerJsdoc(options); 
