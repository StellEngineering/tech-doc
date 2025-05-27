import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddLinkDropdown = ({ section, allSections, setLinks }) => {
  const [linkTarget, setLinkTarget] = useState('');
  const [linkType, setLinkType] = useState('reference');

  const handleAddLink = () => {
    if (!linkTarget) return;

    const targetSection = allSections.find(sec => sec.id === linkTarget);
    if (!targetSection) return;

    const payload = {
      sourceDocumentId: section.documentId,
      sourceSectionId: section.id,
      targetDocumentId: targetSection.documentId,
      targetSectionId: targetSection.id,
      linkType,
      createdBy: 'admin'
    };

    fetch(`${API_BASE_URL}/api/docs/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(newLink => {
      setLinks(prevLinks => [...prevLinks, newLink]);
      setLinkTarget('');
      setLinkType('reference');
    })
    .catch(error => console.error("Error adding link:", error));
  };

  return (
      <div>
        <select
            value={linkTarget}
            onChange={(e) => setLinkTarget(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="">Select Section to Link To</option>
          {allSections.filter(sec => sec.id !== section.id).map(sec => (
              <option key={sec.id} value={sec.id}>
                {sec.title} ({sec.documentTitle})
              </option>
          ))}
        </select>

        <select
            value={linkType}
            onChange={(e) => setLinkType(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="reference">Reference</option>
          <option value="compliance">Compliance</option>
          <option value="dependency">Dependency</option>
        </select>

        <button
            onClick={handleAddLink}
            disabled={!linkTarget}
            className={linkTarget ? 'add-link-button' : 'add-link-button disabled'}
        >
          Add Link
        </button>
      </div>
  );
};


const DocumentSection = ({ section, allSections, links, setLinks, selectedSectionId }) => {
  const sectionLinks = links.filter(link => link.sourceSectionId === section.id);

  return (
      <div
          id={`section-${section.id}`}
          style={{
            margin: '20px 0',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 1px 5px 1px rgba(0, 0, 0, 0.05)',
            backgroundColor: selectedSectionId === section.id ? '#f0f8ff' : 'transparent',
            transition: 'background-color 0.3s ease'
          }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>{section.title} (Section {section.sectionNumber})</h2>
          <AddLinkDropdown section={section} allSections={allSections} setLinks={setLinks} />
        </div>

        <p>{section.content}</p>

        {sectionLinks.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <h4>Links:</h4>
              <ul>
                {sectionLinks.map(link => (
                    <li key={link.id}>
                      <Link to={`/?docId=${link.targetDocumentId}&sectionId=${link.targetSectionId}`}>
                        {link.linkType} → {link.targetDocumentTitle || "Unknown Document"} (Section {link.targetSectionTitle || "Unknown Section"})
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
};

export default DocumentSection;
