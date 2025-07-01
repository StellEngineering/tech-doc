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


/**
 * @swagger
 * /api/docs/links:
 *   post:
 *     tags: [Documents]
 *     summary: Create a new document link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - source_doc_id
 *               - source_section_id
 *               - target_doc_id
 *               - target_section_id
 *               - link_type
 *               - created_by
 *             properties:
 *               source_doc_id:
 *                 type: string
 *                 format: uuid
 *               source_section_id:
 *                 type: string
 *                 format: uuid
 *               target_doc_id:
 *                 type: string
 *                 format: uuid
 *               target_section_id:
 *                 type: string
 *                 format: uuid
 *               link_type:
 *                 type: string
 *                 example: "reference"
 *               created_by:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Link created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *             example:
 *               id: "c735f0a2-d021-4e5c-9f9b-62d445c4b80a"
 *       400:
 *         description: Invalid request body
 */
router.post('/links', docController.newLink)

export default router;
