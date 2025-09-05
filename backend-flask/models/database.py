import sqlite3
import uuid
from config import DATABASE

# Global database connection for in-memory database
_db_connection = None

def get_db():
    global _db_connection
    if _db_connection is None:
        _db_connection = sqlite3.connect(DATABASE, check_same_thread=False)
        _db_connection.row_factory = sqlite3.Row  # This enables column access by name
    return _db_connection

def init_db():
    db = get_db()
    cursor = db.cursor()
    
    # Create Documents Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS documents (
            id TEXT PRIMARY KEY,
            title TEXT,
            content TEXT
        )
    ''')
    
    # Create Sections Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sections (
            id TEXT PRIMARY KEY,
            documentId TEXT,
            sectionNumber INTEGER,
            title TEXT,
            content TEXT,
            FOREIGN KEY (documentId) REFERENCES documents(id) ON DELETE CASCADE
        )
    ''')
    
    # Create Links Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS links (
            id TEXT PRIMARY KEY,
            sourceDocumentId TEXT,
            sourceSectionId TEXT,
            targetDocumentId TEXT,
            targetSectionId TEXT,
            linkType TEXT CHECK(linkType IN ('reference', 'compliance', 'dependency')),
            createdBy TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sourceDocumentId) REFERENCES documents(id),
            FOREIGN KEY (targetDocumentId) REFERENCES documents(id),
            FOREIGN KEY (sourceSectionId) REFERENCES sections(id),
            FOREIGN KEY (targetSectionId) REFERENCES sections(id)
        )
    ''')
    
    # Seed data
    documents = [
        {'title': 'Document A', 'content': 'Overview of Document A'},
        {'title': 'Document B', 'content': 'Overview of Document B'},
        {'title': 'Document C', 'content': 'Overview of Document C'}
    ]
    
    doc_ids = {}
    for doc in documents:
        doc_id = str(uuid.uuid4())
        cursor.execute(
            'INSERT INTO documents (id, title, content) VALUES (?, ?, ?)',
            (doc_id, doc['title'], doc['content'])
        )
        doc_ids[doc['title']] = doc_id
    
    # Insert Sections
    sections = [
        {'doc': 'Document A', 'number': 1, 'title': '1A', 'content': 'Content of Section 1A'},
        {'doc': 'Document A', 'number': 2, 'title': '2A', 'content': 'Content of Section 2A'},
        {'doc': 'Document A', 'number': 3, 'title': '3A', 'content': 'Content of Section 3A'},
        
        {'doc': 'Document B', 'number': 1, 'title': '1B', 'content': 'Content of Section 1B'},
        {'doc': 'Document B', 'number': 2, 'title': '2B', 'content': 'Content of Section 2B'},
        {'doc': 'Document B', 'number': 3, 'title': '3B', 'content': 'Content of Section 3B'},
        
        {'doc': 'Document C', 'number': 1, 'title': '1C', 'content': 'Content of Section 1C'},
        {'doc': 'Document C', 'number': 2, 'title': '2C', 'content': 'Content of Section 2C'},
        {'doc': 'Document C', 'number': 3, 'title': '3C', 'content': 'Content of Section 3C'}
    ]
    
    section_ids = {}
    for section in sections:
        section_id = str(uuid.uuid4())
        cursor.execute(
            'INSERT INTO sections (id, documentId, sectionNumber, title, content) VALUES (?, ?, ?, ?, ?)',
            (section_id, doc_ids[section['doc']], section['number'], section['title'], section['content'])
        )
        section_ids[f"{section['doc']}-{section['number']}"] = section_id
    
    # Insert Links (Note: Some links reference non-existent documents, they will be skipped)
    links = [
        {'sourceDoc': 'Document A', 'sourceSec': 1, 'targetDoc': 'Document B', 'targetSec': 1, 'type': 'reference'},
        {'sourceDoc': 'Document A', 'sourceSec': 2, 'targetDoc': 'Document C', 'targetSec': 1, 'type': 'dependency'},
        {'sourceDoc': 'Document B', 'sourceSec': 1, 'targetDoc': 'Document C', 'targetSec': 2, 'type': 'compliance'},
        {'sourceDoc': 'Document C', 'sourceSec': 2, 'targetDoc': 'Document A', 'targetSec': 3, 'type': 'dependency'}
    ]
    
    for link in links:
        # Only insert links where both source and target exist
        if link['sourceDoc'] in doc_ids and link['targetDoc'] in doc_ids:
            source_section_key = f"{link['sourceDoc']}-{link['sourceSec']}"
            target_section_key = f"{link['targetDoc']}-{link['targetSec']}"
            
            if source_section_key in section_ids and target_section_key in section_ids:
                cursor.execute('''
                    INSERT INTO links (id, sourceDocumentId, sourceSectionId, targetDocumentId, targetSectionId, linkType, createdBy)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (
                    str(uuid.uuid4()),
                    doc_ids[link['sourceDoc']],
                    section_ids[source_section_key],
                    doc_ids[link['targetDoc']],
                    section_ids[target_section_key],
                    link['type'],
                    'admin'
                ))
    
    db.commit()
    print('Database initialized.')