import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DocumentSection from './DocumentSection';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DocumentPage = () => {
  const location = useLocation();
  const [activeDoc, setActiveDoc] = useState(null);
  const [sections, setSections] = useState([]);
  const [links, setLinks] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  useEffect(() => {
    const docId = new URLSearchParams(location.search).get('docId');
    const sectionId = new URLSearchParams(location.search).get('sectionId');

    if (!docId) return;

    fetch(`${API_BASE_URL}/api/docs/${docId}`)
    .then(res => res.json())
    .then(doc => setActiveDoc(doc))
    .catch(error => console.error("Error fetching document:", error));

    fetch(`${API_BASE_URL}/api/docs/${docId}/sections`)
    .then(res => res.json())
    .then(data => {
      setSections(data);
      if (sectionId) setSelectedSectionId(sectionId);
    })
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

  useEffect(() => {
    if (selectedSectionId) {
      const timeout = setTimeout(() => {
        setSelectedSectionId(null);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [selectedSectionId]);

  useEffect(() => {
    if (selectedSectionId) {
      const sectionElement = document.getElementById(`section-${selectedSectionId}`);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedSectionId]);

  if (!activeDoc) return <div>Select a document from the sidebar.</div>;

  return (
      <div>
        <h1>{activeDoc.title}</h1>
        <p>{activeDoc.content}</p>

        {sections.map(section => (
            <DocumentSection
                key={section.id}
                section={section}
                allSections={allSections}
                links={links}
                setLinks={setLinks}
                selectedSectionId={selectedSectionId}
            />
        ))}
      </div>
  );
};

export default DocumentPage;
