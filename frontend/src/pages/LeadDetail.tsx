import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLead, updateLead, createNote } from '../api/leads';
import type { Lead, Note } from '../api/client';
import { format } from 'date-fns';
import { ArrowLeft, User, Mail, Phone, Calendar } from 'lucide-react';

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [lead, setLead] = useState<(Lead & { notes: Note[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  const fetchLead = async () => {
    try {
      const res = await getLead(Number(id));
      setLead(res.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        navigate('/');
      } else {
        setError('Failed to load lead details');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchLead();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return;
    try {
      await updateLead(lead.id, { status: newStatus });
      fetchLead();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !lead) return;
    
    setSubmittingNote(true);
    try {
      await createNote(lead.id, newNote);
      setNewNote('');
      fetchLead();
    } catch (err) {
      alert('Failed to add note');
    } finally {
      setSubmittingNote(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error || !lead) return <div className="text-center py-20 text-red-500">{error || 'Lead not found'}</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 gap-2">
        <ArrowLeft size={16} /> Back to Leads
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Lead Info</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <User size={18} />
                <span className="font-medium text-gray-900">{lead.name}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar size={18} />
                <span>{format(new Date(lead.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>
            
            <form onSubmit={handleAddNote} className="mb-8">
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
                rows={3}
                placeholder="Add a new note..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingNote || !newNote.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {submittingNote ? 'Adding...' : 'Add Note'}
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {lead.notes.length === 0 ? (
                <p className="text-gray-500 text-center py-4 border border-dashed border-gray-200 rounded-lg">
                  No notes yet.
                </p>
              ) : (
                lead.notes.map(note => (
                  <div key={note.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {format(new Date(note.createdAt), 'MMM d, yyyy - h:mm a')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
