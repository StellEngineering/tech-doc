import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DocumentPage = () => {
  const location = useLocation();
  const [activeDoc, setActiveDoc] = useState(null);
  const [sections, setSections] = useState([]);
  const [links, setLinks] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [newLink, setNewLink] = useState({
    targetSectionId: '',
    sourceSectionId: '',
    linkType: 'dependency',
  })

  useEffect(() => {
    const docId = new URLSearchParams(location.search).get('docId');
    if (!docId) return;

    fetch(`${API_BASE_URL}/api/docs/${docId}`)
    .then(res => res.json())
    .then(doc => setActiveDoc(doc))
    .catch(error => console.error("Error fetching document:", error));

    fetch(`${API_BASE_URL}/api/docs/${docId}/sections`)
    .then(res => res.json())
    .then(data => {
      console.log('sections', data);
      setSections(data)
  })
    .catch(error => console.error("Error fetching sections:", error));

    fetch(`${API_BASE_URL}/api/docs/${docId}/links`)
    .then(res => res.json())
    .then(data => {
      console.log('links', data);
      setLinks(data)
  })
    .catch(error => console.error("Error fetching links:", error));

    fetch(`${API_BASE_URL}/api/docs/sections`)
    .then(res => res.json())
    .then(data => setAllSections(data))
    .catch(error => console.error("Error fetching all sections:", error));
  }, [location.search]);

  const addLink = (e) => {
    e.preventDefault()
    fetch(`${API_BASE_URL}/api/docs/link/add`, {method: 'POST', body: JSON.stringify(newLink), headers: {'Content-Type': 'application/json'}})
  }

  if (!activeDoc) return <div>Select a document from the sidebar.</div>;

  return (
      <div>
        <h1>{activeDoc.title}</h1>
        <p>{activeDoc.content}</p>
        <div>
          {sections.map(((section, index) => (
            <div key={section.id}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
              <h2>{section.title}</h2>
              <form onSubmit={addLink}>

              <select onChange={(e) => {
                  setNewLink({...newLink, targetSectionId: e.target.value, sourceSectionId: section.id}) 
              }} defaultValue={""}>
                {allSections.map((sec, secIndex) => (
                  <option value={sec.id}>{sec.title}({sec.documentTitle})</option>

                ))}
              </select>
              <select onChange={(e) => {
                  setNewLink({...newLink, linkType: e.target.value}) 
              }} 
              defaultValue={"dependency"}>
                <option value="dependency">dependency</option>
                <option value="reference">reference</option>
                <option value="compliance">compliance</option>
              </select>
              <button type = "submit">
                Add Link
              </button>
              </form>

              </div>
              <p>{section.content}</p>

              <h3>Links:</h3>
              {links.filter((link)=>link.sourceSectionId === section.id).map((link, linkIndex) => (
                <div key={linkIndex}>
                  
                  {/* <p>{JSON.stringify(link)}</p> */}
                  <p>{link.linkType}{link.targetDocumentTitle}({link.targetSectionTitle})</p>
                </div>
              ))}
          
            </div>
          )))}
        </div>
      </div>
  );
};

export default DocumentPage;
