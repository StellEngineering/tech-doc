# Flask Backend for Tech Documentation

A Python Flask implementation of the tech documentation backend, providing REST APIs for managing technical documentation with SQLite database.

Please note that SQLite is in memory and any hot reloads of the app will invalidate previous UUIDs of entities.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Setup Instructions

### 1. Navigate to the backend directory
```bash
cd backend-flask
```

### 2. Create a virtual environment (recommended)
```bash
python3 -m venv venv
```

### 3. Activate the virtual environment
- On macOS/Linux:
  ```bash
  source venv/bin/activate
  ```
- On Windows:
  ```bash
  venv\Scripts\activate
  ```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Run the application
```bash
python app.py
```

The server will start on `http://localhost:5005` by default.

## API Documentation

Once the server is running, you can access the Swagger UI documentation at:
```
http://localhost:5005/swagger/
```

## Available Endpoints

- `GET /api/docs` - Get all documents
- `GET /api/docs/{id}` - Get a specific document by ID
- `GET /api/docs/sections` - Get all sections across all documents
- `GET /api/docs/{id}/sections` - Get sections for a specific document
- `GET /api/docs/{id}/links` - Get links for a specific document

## Configuration

You can configure the server port by setting the `PORT` environment variable in the `.env` file:
```
PORT=5005
```

## Database

The application uses an in-memory SQLite database that is initialized with sample data on startup. The database includes:
- Documents table
- Sections table (related to documents)
- Links table (relationships between document sections)

## Project Structure

```
backend-flask/
├── app.py                 
├── config.py              
├── requirements.txt      
├── .env                  
├── controllers/          
│   └── doc_controller.py
├── models/              
│   ├── database.py     
│   └── doc_model.py    
└── routes/             
    └── doc_routes.py
```

## Development Notes

- The application runs in debug mode by default for development
- CORS is enabled for all origins to allow frontend connections
- The database is recreated in memory each time the server starts
- All API responses are in JSON format

## Troubleshooting

If you encounter any issues:

1. Ensure Python 3.8+ is installed: `python3 --version`
2. Make sure all dependencies are installed: `pip install -r requirements.txt`
3. Check that port 5005 is not in use by another application
4. Verify the virtual environment is activated before running the app