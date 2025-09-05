from flask import jsonify, request
import models.doc_model as doc_model

def get_all_docs():
    try:
        docs = doc_model.get_all_docs()
        return jsonify(docs), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_doc_by_id(doc_id):
    try:
        doc = doc_model.get_doc_by_id(doc_id)
        if not doc:
            return jsonify({'error': 'Document not found'}), 404
        return jsonify(doc), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_sections_for_document(doc_id):
    try:
        sections = doc_model.get_sections_for_document(doc_id)
        return jsonify(sections), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_all_sections():
    try:
        sections = doc_model.get_all_sections()
        return jsonify(sections), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_links_for_document(doc_id):
    try:
        links = doc_model.get_links_for_document(doc_id)
        return jsonify(links), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def create_link():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['sourceDocumentId', 'sourceSectionId', 'targetDocumentId', 'targetSectionId', 'linkType', 'createdBy']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate linkType
        valid_link_types = ['reference', 'compliance', 'dependency']
        if data['linkType'] not in valid_link_types:
            return jsonify({'error': f'Invalid linkType. Must be one of: {valid_link_types}'}), 400
        
        # Create the link
        link = doc_model.create_link(
            data['sourceDocumentId'],
            data['sourceSectionId'], 
            data['targetDocumentId'],
            data['targetSectionId'],
            data['linkType'],
            data['createdBy']
        )
        
        return jsonify(link), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500