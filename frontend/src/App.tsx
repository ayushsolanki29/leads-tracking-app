import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeadsList from './pages/LeadsList';
import CreateLead from './pages/CreateLead';
import LeadDetail from './pages/LeadDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <span className="text-xl font-bold text-blue-600">LeadsTracker</span>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<LeadsList />} />
            <Route path="/leads/new" element={<CreateLead />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
