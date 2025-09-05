from models.database import get_db
import uuid
from datetime import datetime

def get_all_docs():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM documents')
    rows = cursor.fetchall()
    return [dict(row) for row in rows]

def get_doc_by_id(doc_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM documents WHERE id = ?', (doc_id,))
    row = cursor.fetchone()
    return dict(row) if row else None

def get_sections_for_document(document_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM sections WHERE documentId = ?', (document_id,))
    rows = cursor.fetchall()
    return [dict(row) for row in rows]

def get_all_sections():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        SELECT sections.*, documents.title as documentTitle 
        FROM sections 
        JOIN documents ON sections.documentId = documents.id
    ''')
    rows = cursor.fetchall()
    return [dict(row) for row in rows]

def get_links_for_document(document_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        SELECT links.*, 
               targetSections.title as targetSectionTitle, 
               documents.title as targetDocumentTitle, 
               targetSections.sectionNumber as targetSectionNumber 
        FROM links 
        JOIN sections as targetSections ON links.targetSectionId = targetSections.id 
        JOIN documents ON links.targetDocumentId = documents.id 
        WHERE links.sourceDocumentId = ?
    ''', (document_id,))
    rows = cursor.fetchall()
    return [dict(row) for row in rows]

def create_link(source_document_id, source_section_id, target_document_id, target_section_id, link_type, created_by):
    db = get_db()
    cursor = db.cursor()
    
    # Generate new UUID for the link
    link_id = str(uuid.uuid4())
    created_at = datetime.now().isoformat()
    
    # Insert the new link
    cursor.execute('''
        INSERT INTO links (id, sourceDocumentId, sourceSectionId, targetDocumentId, targetSectionId, linkType, createdBy, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (link_id, source_document_id, source_section_id, target_document_id, target_section_id, link_type, created_by, created_at))
    
    # Query back the created link with target document and section information
    cursor.execute('''
        SELECT links.*, 
               targetSections.title as targetSectionTitle, 
               documents.title as targetDocumentTitle, 
               targetSections.sectionNumber as targetSectionNumber 
        FROM links 
        JOIN sections as targetSections ON links.targetSectionId = targetSections.id 
        JOIN documents ON links.targetDocumentId = documents.id 
        WHERE links.id = ?
    ''', (link_id,))
    
    row = cursor.fetchone()
    db.commit()
    
    if row:
        return dict(row)
    else:
        raise Exception("Failed to create link")