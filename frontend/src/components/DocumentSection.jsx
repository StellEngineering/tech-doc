import { useState, useEffect, useMemo } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DocumentSection = (props) => {
    const [linkType, setLinkType] = useState('dependency');
    const [documentSections, setDocumentSections] = useState()
    const [docs, setDocs] = useState();
    const [targetDocument, setTargetDocument] = useState();


    console.log("docs", docs)
    console.log("targetDocumentation", targetDocument)
    console.log("documentSections", documentSections)

    const targetDocumentSelection = useMemo(() => {
        if (!docs || !documentSections) return;
        console.log("HERE")
        const targetDocumentSectionOptions = (docs ?? []).map((document) => {
            const sections = documentSections[document.id]
            const sectionOptions = (sections ?? []).map((section) => {
                return {
                    documentId: document.id,
                    sectionId: section.id,
                    sectionTitle: section.title,
                    documentTitle: document.title
                }
            })
            return sectionOptions
        }).flat()
        console.log("target sections", targetDocumentSectionOptions)
        return targetDocumentSectionOptions
    }, [docs, documentSections])

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/docs`)
        .then(res => res.json())
        .then(data => setDocs(data))
        .catch(error => console.error("Error fetching documents:", error));
    }, []);

    useEffect(() => {
        if (!docs) {
            return;
        }
        docs.forEach((doc) => {
            fetch(`${API_BASE_URL}/api/docs/${doc.id}/sections`)
            .then(res => res.json())
            .then(data => setDocumentSections((existingData) => {
                return {
                    [doc.id]: data,
                    ...existingData,
                }
            }))
            .catch(error => console.error("Error fetching sections:", error));
        });
    }, [docs])

    const addLink = () => {
        if (!targetDocument || !linkType) return;
        console.log("targetDOCUMENT", JSON.stringify(targetDocument))
        const sourceDocumentId = props.section.documentId;
        console.log("SOURCE", props.section)
        const data = {
            sourceDocumentId,
            sourceSectionId: props.section.id,
            targetDocumentId: targetDocument.documentId,
            targetSectionId: targetDocument.sectionId,
        };
        console.log("data", data)
        fetch(`${API_BASE_URL}/api/docs/links`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }




    return (
        <div style={{ border: '1px solid', padding: '16px', display: 'flex', flexBasis: 'column', justifyContent: 'space-between' }}>
            <div>
                <h2 style={{ marginTop: '0px'}}>{props.section.title}</h2>
                <p>{props.section.content}</p>
                <div>
                    <h3>Links:</h3>
                    <ul>
                        {props.links.map((link) => {
                            console.log(link)
                            return (
                                <li>
                                    <a href="">{link.linkType} -- {link.targetDocumentTitle} (Section {link.targetSectionTitle}) </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div>
                <select name="documentRef" id="documentRef" onChange={(event) => setTargetDocument(JSON.parse(event.target.value))} value={targetDocument}>
                    {(targetDocumentSelection ?? []).map((targetDocumentSection) => {
                        return (
                            <option value={JSON.stringify(targetDocumentSection)}>{targetDocumentSection.sectionTitle} ({targetDocumentSection.documentTitle})</option>
                        )
                    })}
                        
                </select>
                <select name="linkTypes" id="linkType" onChange={(event) => setLinkType(event.target.value)} value={linkType}>
                    <option value="dependency">dependency</option>
                    <option value="reference">reference</option>
                    <option value="compliance">compliance</option>
                </select>
                <button onClick={() => addLink()}>Add link</button>
            </div>

        </div>
    )
}

export {
    DocumentSection
}