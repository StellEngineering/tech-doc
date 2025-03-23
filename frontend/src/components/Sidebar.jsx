import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Sidebar = () => {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/docs`)
    .then(res => res.json())
    .then(data => setDocs(data))
    .catch(error => console.error("Error fetching documents:", error));
  }, []);

  const filteredDocs = docs.filter(doc =>
      doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div style={styles.sidebar}>
        <h2 style={styles.title}>Documents</h2>

        <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
        />

        <ul style={styles.docList}>
          {filteredDocs.map(doc => (
              <li
                  key={doc.id}
                  style={styles.docItem}
                  onClick={() => navigate(`?docId=${doc.id}`)}
              >
                {doc.title}
              </li>
          ))}
        </ul>
      </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#f0f0f0',
    padding: '15px',
    borderRight: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '22px',
    textAlign: 'center',
    color: '#333'
  },
  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.2s',
    marginBottom: '15px',
    width: '100%',
    boxSizing: 'border-box'
  },
  docList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    flexGrow: 1,
    overflowY: 'auto',
  },
  docItem: {
    padding: '10px',
    marginBottom: '8px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
    border: '1px solid transparent',
  },
  docItemHover: {
    backgroundColor: '#e0e0e0',
    transform: 'scale(1.02)',
    borderColor: '#ccc',
  }
};

export default Sidebar;
