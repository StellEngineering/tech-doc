import models.doc_model as doc_model

class DocumentNotFoundError(Exception):
    pass

def get_all_docs():
    return doc_model.get_all_docs()

def get_doc_by_id(doc_id):
    doc = doc_model.get_doc_by_id(doc_id)
    if not doc:
        raise DocumentNotFoundError('Document not found')
    return doc

def get_sections_for_document(doc_id):
    return doc_model.get_sections_for_document(doc_id)

def get_all_sections():
    return doc_model.get_all_sections()

def get_links_for_document(doc_id):
    return doc_model.get_links_for_document(doc_id)

def get_all_content(doc_id):
    """
    Get all sections with their associated links for a document.
    Returns sections with embedded links array for each section.
    """
    # Get all sections for the document
    sections = get_sections_for_document(doc_id)
    
    # Get all links for the document  
    links = get_links_for_document(doc_id)
    
    # Create a map of links by source section ID for efficient lookup
    links_by_source = {}
    for link in links:
        source_id = link.get('sourceSectionId')
        if source_id:
            if source_id not in links_by_source:
                links_by_source[source_id] = []
            links_by_source[source_id].append({
                'linkId': link.get('id'),
                'sourceSectionId': link.get('sourceSectionId'),
                'targetSectionId': link.get('targetSectionId'),
                'targetSectionTitle': link.get('targetSectionTitle'),
                'targetDocumentId': link.get('targetDocumentId'),
                'targetDocumentTitle': link.get('targetDocumentTitle'),
                'type': link.get('linkType')
            })
    
    # Build the aggregated response
    result = []
    for section in sections:
        section_id = section.get('id')
        section_data = {
            'sectionTitle': section.get('title'),
            'sectionId': section_id,
            'sectionNumber': section.get('sectionNumber'),
            'content': section.get('content'),
            'links': links_by_source.get(section_id, [])
        }
        result.append(section_data)
    
    return result