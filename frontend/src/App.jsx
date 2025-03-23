import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentPage from './pages/document-page/DocumentPage';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
      <Router>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <div style={{ flexGrow: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<DocumentPage />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;