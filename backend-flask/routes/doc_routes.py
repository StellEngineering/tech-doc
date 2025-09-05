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

## Create a new link between document sections
@docs_bp.route('/links', methods=['POST'])
@swag_from({
    'tags': ['Documents'],
    'summary': 'Create a new link between document sections',
    'description': 'Creates a typed relationship between two document sections',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'required': ['sourceDocumentId', 'sourceSectionId', 'targetDocumentId', 'targetSectionId', 'linkType', 'createdBy'],
                'properties': {
                    'sourceDocumentId': {'type': 'string', 'format': 'uuid', 'description': 'ID of the source document'},
                    'sourceSectionId': {'type': 'string', 'format': 'uuid', 'description': 'ID of the source section'},
                    'targetDocumentId': {'type': 'string', 'format': 'uuid', 'description': 'ID of the target document'},
                    'targetSectionId': {'type': 'string', 'format': 'uuid', 'description': 'ID of the target section'},
                    'linkType': {'type': 'string', 'enum': ['reference', 'compliance', 'dependency'], 'description': 'Type of link relationship'},
                    'createdBy': {'type': 'string', 'description': 'User who created the link'}
                }
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Link created successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'string', 'format': 'uuid'},
                    'sourceDocumentId': {'type': 'string', 'format': 'uuid'},
                    'sourceSectionId': {'type': 'string', 'format': 'uuid'},
                    'targetDocumentId': {'type': 'string', 'format': 'uuid'},
                    'targetSectionId': {'type': 'string', 'format': 'uuid'},
                    'targetDocumentTitle': {'type': 'string'},
                    'targetSectionTitle': {'type': 'string'},
                    'targetSectionNumber': {'type': 'integer'},
                    'linkType': {'type': 'string'},
                    'createdBy': {'type': 'string'},
                    'createdAt': {'type': 'string', 'format': 'date-time'}
                }
            }
        },
        400: {
            'description': 'Bad request - missing or invalid fields'
        },
        500: {
            'description': 'Internal server error'
        }
    }
})
def create_link():
    return doc_controller.create_link()