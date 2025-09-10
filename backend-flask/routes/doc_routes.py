from flask import Blueprint
from flasgger import swag_from
import controllers.doc_controller as doc_controller

docs_bp = Blueprint('docs', __name__)

## Get all documents
@docs_bp.route('/', methods=['GET'])
@swag_from({
    'tags': ['Documents'],
    'summary': 'Get all documents',
    'responses': {
        200: {
            'description': 'A list of all documents',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'string', 'format': 'uuid'},
                        'title': {'type': 'string'},
                        'content': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_all_docs():
    return doc_controller.get_all_docs()

## Get a specific document by ID
@docs_bp.route('/<doc_id>', methods=['GET'])
@swag_from({
    'tags': ['Documents'],
    'summary': 'Get a specific document by ID',
    'parameters': [
        {
            'name': 'doc_id',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'Document ID'
        }
    ],
    'responses': {
        200: {
            'description': 'The requested document',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'string'},
                    'title': {'type': 'string'},
                    'content': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Document not found'
        }
    }
})
def get_doc_by_id(doc_id):
    return doc_controller.get_doc_by_id(doc_id)

## Get all sections across all documents
@docs_bp.route('/sections', methods=['GET'])
@swag_from({
    'tags': ['Documents'],
    'summary': 'Get all sections across all documents',
    'description': 'Retrieve a list of all sections from all documents',
    'responses': {
        200: {
            'description': 'A list of sections',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'string', 'format': 'uuid'},
                        'documentId': {'type': 'string', 'format': 'uuid'},
                        'sectionNumber': {'type': 'integer'},
                        'title': {'type': 'string'},
                        'content': {'type': 'string'},
                        'documentTitle': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_all_sections():
    return doc_controller.get_all_sections()

## Get sections for a specific document
@docs_bp.route('/<doc_id>/sections', methods=['GET'])
@swag_from({
    'tags': ['Documents'],
    'summary': 'Get sections for a specific document',
    'parameters': [
        {
            'name': 'doc_id',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'Document ID'
        }
    ],
    'responses': {
        200: {
            'description': 'A list of sections for the specified document',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'string', 'format': 'uuid'},
                        'documentId': {'type': 'string', 'format': 'uuid'},
                        'sectionNumber': {'type': 'integer'},
                        'title': {'type': 'string'},
                        'content': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_sections_for_document(doc_id):
    return doc_controller.get_sections_for_document(doc_id)

## Get links for a specific document
@docs_bp.route('/<doc_id>/links', methods=['GET'])
@swag_from({
    'tags': ['Documents'],
    'summary': 'Get links for a specific document',
    'parameters': [
        {
            'name': 'doc_id',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'Document ID'
        }
    ],
    'responses': {
        200: {
            'description': 'A list of links for the specified document',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'string', 'format': 'uuid'},
                        'sourceDocumentId': {'type': 'string', 'format': 'uuid'},
                        'sourceSectionId': {'type': 'string', 'format': 'uuid'},
                        'targetDocumentId': {'type': 'string', 'format': 'uuid'},
                        'targetSectionId': {'type': 'string', 'format': 'uuid'},
                        'linkType': {'type': 'string'},
                        'createdBy': {'type': 'string'},
                        'createdAt': {'type': 'string'},
                        'targetSectionTitle': {'type': 'string'},
                        'targetDocumentTitle': {'type': 'string'},
                        'targetSectionNumber': {'type': 'integer'}
                    }
                }
            }
        }
    }
})
def get_links_for_document(doc_id):
    return doc_controller.get_links_for_document(doc_id)

@docs_bp.route('/<doc_id>/all_content', methods=['GET'])
@swag_from({
    'tags': ['Documents'],
    'summary': 'Get all content for a document',
    'parameters': [
        {
            'name': 'doc_id',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'Document ID (UUID format)'
        }
    ],
    'responses': {
        200: {
            'description': 'All sections with their links',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'sectionTitle': {'type': 'string'},
                        'sectionId': {'type': 'string', 'format': 'uuid'},
                        'sectionNumber': {'type': 'integer'},
                        'content': {'type': 'string'},
                        'links': {
                            'type': 'array',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'sectionId': {'type': 'string', 'format': 'uuid'},
                                    'sectionTitle': {'type': 'string'},
                                    'type': {'type': 'string'},
                                    'linkId': {'type': 'string', 'format': 'uuid'},
                                    'targetDocumentId': {'type': 'string', 'format': 'uuid'},
                                    'targetDocumentTitle': {'type': 'string'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})
def get_all_content(doc_id):
    # TODO IMPLEMENT
    pass