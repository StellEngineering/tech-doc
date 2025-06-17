import express from 'express';
import * as docController from '../controllers/docController.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Document management endpoints
 */

/**
 * @swagger
 * /api/docs/sections:
 *   get:
 *     tags: [Documents]
 *     summary: Get all sections across all documents
 *     description: Retrieve a list of all sections from all documents
 *     responses:
 *       200:
 *         description: A list of sections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/sections', docController.getAllSections);

/**
 * @swagger
 * /api/docs/{id}/sections:
 *   get:
 *     tags: [Documents]
 *     summary: Get sections for a specific document
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     responses:
 *       200:
 *         description: A list of sections for the specified document
 */
router.get('/:id/sections', docController.getSectionsForDocument);

/**
 * @swagger
 * /api/docs/{id}/links:
 *   get:
 *     tags: [Documents]
 *     summary: Get links for a specific document
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     responses:
 *       200:
 *         description: A list of links for the specified document
 */
router.get('/:id/links', docController.getLinksForDocument);

/**
 * @swagger
 * /api/docs/{id}:
 *   get:
 *     tags: [Documents]
 *     summary: Get a specific document by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     responses:
 *       200:
 *         description: The requested document
 */
router.get('/:id', docController.getDocById);

/**
 * @swagger
 * /api/docs:
 *   get:
 *     tags: [Documents]
 *     summary: Get all documents
 *     responses:
 *       200:
 *         description: A list of all documents
 */
router.get('/', docController.getAllDocs);

export default router;
