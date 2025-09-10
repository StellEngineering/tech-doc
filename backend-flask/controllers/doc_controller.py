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