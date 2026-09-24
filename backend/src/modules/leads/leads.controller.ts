import { Request, Response } from 'express';
import { leadsService } from './leads.service';
import { createLeadSchema, updateLeadSchema, createNoteSchema } from './leads.validation';

export const getLeads = async (req: Request, res: Response) => {
  try {
    const { search, status } = req.query;
    const leads = await leadsService.getAllLeads(search as string, status as string);
    res.status(200).json({ data: leads });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

export const getLead = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const lead = await leadsService.getLeadById(id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json({ data: lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const { error, value } = createLeadSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => ({ field: d.path.join('.'), message: d.message }))
      });
    }
    const lead = await leadsService.createLead(value);
    res.status(201).json({ data: lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lead' });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await leadsService.getLeadById(id);
    if (!existing) return res.status(404).json({ error: 'Lead not found' });

    const { error, value } = updateLeadSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => ({ field: d.path.join('.'), message: d.message }))
      });
    }
    
    const lead = await leadsService.updateLead(id, value);
    res.status(200).json({ data: lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lead' });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await leadsService.getLeadById(id);
    if (!existing) return res.status(404).json({ error: 'Lead not found' });

    await leadsService.deleteLead(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const leadId = parseInt(req.params.id);
    const existing = await leadsService.getLeadById(leadId);
    if (!existing) return res.status(404).json({ error: 'Lead not found' });

    const notes = await leadsService.getNotesByLeadId(leadId);
    res.status(200).json({ data: notes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const leadId = parseInt(req.params.id);
    const existing = await leadsService.getLeadById(leadId);
    if (!existing) return res.status(404).json({ error: 'Lead not found' });

    const { error, value } = createNoteSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => ({ field: d.path.join('.'), message: d.message }))
      });
    }

    const note = await leadsService.createNote(leadId, value.content);
    res.status(201).json({ data: note });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};
