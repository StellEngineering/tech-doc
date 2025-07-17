import db from '../db.mjs';
import { v4 as uuidv4 } from 'uuid';

export const getAllDocs = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM documents', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getDocById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM documents WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const getSectionsForDocument = (documentId) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM sections WHERE documentId = ?', [documentId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getAllSections = () => {
  return new Promise((resolve, reject) => {
    db.all(
        `SELECT sections.*, documents.title as documentTitle FROM sections JOIN documents ON sections.documentId = documents.id`,
        [],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
    );
  });
};

export const getLinksForDocument = (documentId) => {
  return new Promise((resolve, reject) => {
    db.all(
        `SELECT links.*, targetSections.title as targetSectionTitle, documents.title as targetDocumentTitle, targetSections.sectionNumber as targetSectionNumber 
       FROM links 
       JOIN sections as targetSections ON links.targetSectionId = targetSections.id 
       JOIN documents ON links.targetDocumentId = documents.id 
       WHERE links.sourceDocumentId = ?`,
        [documentId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
    );
  });
};

export const addLink = (documentId) => {
  return new Promise((resolve, reject) => {
    /*
    db.run(
      Select the links collection
      insert the new link (passed through from docController function)
      reject or resolve depending on if error occurs

    )
    */
    db.run(
        `SELECT links.*, targetSections.title as targetSectionTitle, documents.title as targetDocumentTitle, targetSections.sectionNumber as targetSectionNumber 
       FROM links 
       JOIN sections as targetSections ON links.targetSectionId = targetSections.id 
       JOIN documents ON links.targetDocumentId = documents.id 
       WHERE links.sourceDocumentId = ?`,
        [documentId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
    );
  });
};

