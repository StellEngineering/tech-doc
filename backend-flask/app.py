from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
import os
from dotenv import load_dotenv

from routes.doc_routes import docs_bp
from models.database import init_db
from config import PORT

load_dotenv()

app = Flask(__name__)
CORS(app)

# Swagger configuration
swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": 'apispec',
            "route": '/apispec.json',
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/swagger/"
}

swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "Tech Documentation API",
        "description": "API for managing technical documentation",
        "version": "1.0.0"
    },
    "host": f"localhost:{PORT}",
    "basePath": "/",
    "schemes": ["http"],
    "tags": [
        {
            "name": "Documents",
            "description": "Document management endpoints"
        }
    ]
}

swagger = Swagger(app, config=swagger_config, template=swagger_template)

# Register blueprints
app.register_blueprint(docs_bp, url_prefix='/api/docs')

# Initialize database
with app.app_context():
    init_db()

if __name__ == '__main__':
    app.run(debug=True, port=PORT)