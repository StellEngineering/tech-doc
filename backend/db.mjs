import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  // Create Documents Table
  db.run(`CREATE TABLE documents (
    id TEXT PRIMARY KEY,
    title TEXT,
    content TEXT
  )`);

  // Create Sections Table
  db.run(`CREATE TABLE sections (
    id TEXT PRIMARY KEY,
    documentId TEXT,
    sectionNumber INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY (documentId) REFERENCES documents(id) ON DELETE CASCADE
  )`);

  // Create Links Table
  db.run(`CREATE TABLE links (
    id TEXT PRIMARY KEY,
    sourceDocumentId TEXT,
    sourceSectionId TEXT,
    targetDocumentId TEXT,
    targetSectionId TEXT,
    linkType TEXT CHECK(linkType IN ('reference', 'compliance', 'dependency')),
    createdBy TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sourceDocumentId) REFERENCES documents(id),
    FOREIGN KEY (targetDocumentId) REFERENCES documents(id),
    FOREIGN KEY (sourceSectionId) REFERENCES sections(id),
    FOREIGN KEY (targetSectionId) REFERENCES sections(id)
  )`);

  // Insert Documents
  const documents = [
    { title: 'Document A', content: 'Overview of Document A' },
    { title: 'Document B', content: 'Overview of Document B' },
    { title: 'Document C', content: 'Overview of Document C' },
    { title: 'Document D', content: 'Overview of Document D' },
    { title: 'Document E', content: 'Overview of Document E' },
  ];

  const docIds = {};
  documents.forEach(doc => {
    const docId = uuidv4();
    db.run(`INSERT INTO documents (id, title, content) VALUES (?, ?, ?)`, [docId, doc.title, doc.content]);
    docIds[doc.title] = docId;
  });

  // Insert Sections
  const sections = [
    { doc: 'Document A', number: 1, title: '1A', content: 'Content of Section 1A' },
    { doc: 'Document A', number: 2, title: '2A', content: 'Content of Section 2A' },
    { doc: 'Document A', number: 3, title: '3A', content: 'Content of Section 3A' },

    { doc: 'Document B', number: 1, title: '1B', content: 'Content of Section 1B' },
    { doc: 'Document B', number: 2, title: '2B', content: 'Content of Section 2B' },
    { doc: 'Document B', number: 3, title: '3B', content: 'Content of Section 3B' },

    { doc: 'Document C', number: 1, title: '1C', content: 'Content of Section 1C' },
    { doc: 'Document C', number: 2, title: '2C', content: 'Content of Section 2C' },
    { doc: 'Document C', number: 3, title: '3C', content: 'Content of Section 3C' },

    { doc: 'Document D', number: 1, title: '1D', content: 'Content of Section 1D' },
    { doc: 'Document D', number: 2, title: '2D', content: 'Content of Section 2D' },
    { doc: 'Document D', number: 3, title: '3D', content: 'Content of Section 3D' },

    { doc: 'Document E', number: 1, title: '1E', content: 'Content of Section 1E' },
    { doc: 'Document E', number: 2, title: '2E', content: 'Content of Section 2E' },
    { doc: 'Document E', number: 3, title: '3E', content: 'Content of Section 3E' }
  ];

  const sectionIds = {};
  sections.forEach(section => {
    const sectionId = uuidv4();
    db.run(`INSERT INTO sections (id, documentId, sectionNumber, title, content) VALUES (?, ?, ?, ?, ?)`,
        [sectionId, docIds[section.doc], section.number, section.title, section.content]);
    sectionIds[`${section.doc}-${section.number}`] = sectionId;
  });

  // Insert Links (Using UUIDs)
  const links = [
    { sourceDoc: 'Document A', sourceSec: 1, targetDoc: 'Document B', targetSec: 1, type: 'reference' },
    { sourceDoc: 'Document A', sourceSec: 2, targetDoc: 'Document C', targetSec: 1, type: 'dependency' },
    { sourceDoc: 'Document A', sourceSec: 3, targetDoc: 'Document D', targetSec: 1, type: 'reference' },
    { sourceDoc: 'Document B', sourceSec: 1, targetDoc: 'Document C', targetSec: 2, type: 'compliance' },
    { sourceDoc: 'Document B', sourceSec: 2, targetDoc: 'Document E', targetSec: 1, type: 'reference' },
    { sourceDoc: 'Document C', sourceSec: 1, targetDoc: 'Document D', targetSec: 2, type: 'reference' },
    { sourceDoc: 'Document C', sourceSec: 2, targetDoc: 'Document A', targetSec: 3, type: 'dependency' },
    { sourceDoc: 'Document D', sourceSec: 1, targetDoc: 'Document E', targetSec: 3, type: 'reference' },
    { sourceDoc: 'Document E', sourceSec: 1, targetDoc: 'Document A', targetSec: 1, type: 'reference' },
    { sourceDoc: 'Document E', sourceSec: 2, targetDoc: 'Document B', targetSec: 2, type: 'dependency' }
  ];

  links.forEach(link => {
    db.run(`INSERT INTO links (id, sourceDocumentId, sourceSectionId, targetDocumentId, targetSectionId, linkType, createdBy) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [uuidv4(), docIds[link.sourceDoc], sectionIds[`${link.sourceDoc}-${link.sourceSec}`],
          docIds[link.targetDoc], sectionIds[`${link.targetDoc}-${link.targetSec}`],
          link.type, 'admin']);
  });

  console.log('Database initialized.');
});

export default db;
