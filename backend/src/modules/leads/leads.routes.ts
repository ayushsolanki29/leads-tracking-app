import { Router } from 'express';
import { getLeads, createLead, getLead, updateLead, deleteLead, getNotes, createNote } from './leads.controller';

const router = Router();

router.get('/', getLeads);
router.post('/', createLead);
router.get('/:id', getLead);
router.patch('/:id', updateLead);
router.delete('/:id', deleteLead);

router.get('/:id/notes', getNotes);
router.post('/:id/notes', createNote);

export default router;
