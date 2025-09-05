from models.database import get_db

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