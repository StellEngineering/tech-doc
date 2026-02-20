## Technical Document Interview Project

### Backend Setup
This project includes two backend implementations of the same service:
- `backend` (Node.js + Express)
- `backend-flask` (Python + Flask)

They expose the same core API domain and are intended as equivalent stack options for the interview.

Choose one backend to run:

#### Option A: Node.js backend (`backend`)
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

#### Option B: Flask backend (`backend-flask`)
1. Navigate to the backend folder: `cd backend-flask`
2. Create a virtual environment: `python3 -m venv venv`
3. Activate it: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Start the server: `python app.py`

By default, both backends run on `http://localhost:5005`, so run only one at a time unless you change the `PORT` for one of them.

### Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
