import * as docModel from '../models/docModel.mjs';

export const getAllDocs = async (req, res) => {
  try {
    const docs = await docModel.getAllDocs();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDocById = async (req, res) => {
  try {
    const doc = await docModel.getDocById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSectionsForDocument = async (req, res) => {
  try {
    const sections = await docModel.getSectionsForDocument(req.params.id);
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllSections = async (req, res) => {
  try {
    const sections = await docModel.getAllSections();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLinksForDocument = async (req, res) => {
  try {
    const links = await docModel.getLinksForDocument(req.params.id);
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const newLink = async (req, res) => {
  try {
    const source_doc_id = req.body.sourceDoumentId
    const source_section_id = req.body.sourceSectionId
    const target_doc_id = req.body.targetDoumentId
    const target_section_id = req.body.targetSectionId 
    const link_type = req.body.linkType
    const created_by = req.body.createdBy 


    const response = await docModel.setLink(source_doc_id,source_section_id,target_doc_id,target_section_id,link_type,created_by);
    console.log(response)
    console.log("hello)")
    //get necessary ingo
    //create Link = new Link()
    //save link in db
    //return link
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};