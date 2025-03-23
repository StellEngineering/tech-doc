import express from 'express';
import * as docController from '../controllers/docController.mjs';

const router = express.Router();

// Get all sections across all documents
router.get('/sections', docController.getAllSections);

// Document routes
router.get('/:id/sections', docController.getSectionsForDocument);
router.get('/:id/links', docController.getLinksForDocument);
router.get('/:id', docController.getDocById);
router.get('/', docController.getAllDocs);

// Create a new link
router.post('/links', docController.createLink);

export default router;

