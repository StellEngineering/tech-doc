import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DocumentPage = () => {
  const location = useLocation();
  const [activeDoc, setActiveDoc] = useState(null);
  const [sections, setSections] = useState([]);
  const [links, setLinks] = useState([]);
  const [allSections, setAllSections] = useState([]);

  useEffect(() => {
    const docId = new URLSearchParams(location.search).get('docId');
    if (!docId) return;

    fetch(`${API_BASE_URL}/api/docs/${docId}`)
    .then(res => res.json())
    .then(doc => setActiveDoc(doc))
    .catch(error => console.error("Error fetching document:", error));

    fetch(`${API_BASE_URL}/api/docs/${docId}/sections`)
    .then(res => res.json())
    .then(data => setSections(data))
    .catch(error => console.error("Error fetching sections:", error));

    fetch(`${API_BASE_URL}/api/docs/${docId}/links`)
    .then(res => res.json())
    .then(data => setLinks(data))
    .catch(error => console.error("Error fetching links:", error));

    fetch(`${API_BASE_URL}/api/docs/sections`)
    .then(res => res.json())
    .then(data => setAllSections(data))
    .catch(error => console.error("Error fetching all sections:", error));
  }, [location.search]);

  if (!activeDoc) return <div>Select a document from the sidebar.</div>;

  return (
      <div>
        <h1>{activeDoc.title}</h1>
        <p>{activeDoc.content}</p>
      </div>
  );
};

export default DocumentPage;
