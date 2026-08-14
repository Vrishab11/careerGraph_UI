import React, { useEffect, useState, createContext, useContext } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { api } from './api/api.js';
import Dashboard from './pages/Dashboard.jsx';
import Recommendations from './pages/Recommendations.jsx';
import JobDetails from './pages/JobDetails.jsx';
import GraphExplorer from './pages/GraphExplorer.jsx';

export const CandidateContext = createContext(null);
export function useCandidate() { return useContext(CandidateContext); }

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [candidateId, setCandidateId] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.listCandidates()
      .then((list) => {
        setCandidates(list);
        if (list.length) {
          setCandidateId(list[0].id);
        } else {
          setLoadError('The API returned an empty candidate list. Is the backend seeded?');
        }
      })
      .catch((err) => {
        console.error('Failed to load candidates:', err);
        setLoadError(err.message || 'Could not reach the API.');
      });
  }, []);

  return (
    <CandidateContext.Provider value={{ candidateId }}>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand" onClick={() => navigate('/')}>
            <span className="brand-mark">◈</span> CareerGraph
          </div>
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
            <NavLink to="/recommendations" className={({ isActive }) => (isActive ? 'active' : '')}>Recommendations</NavLink>
          </nav>
          <div className="candidate-switcher">
            <label>Candidate</label>
            <select value={candidateId ?? ''} onChange={(e) => setCandidateId(e.target.value)}>
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </header>

        <main className="content">
          {loadError ? (
            <div className="loading" style={{ color: 'var(--accent-orange)' }}>
              Couldn't load CareerGraph: {loadError}
              <br />
              <span className="muted" style={{ fontSize: '0.8rem' }}>
                Check that the backend is running on the expected port and that /api requests aren't blocked.
              </span>
            </div>
          ) : candidateId ? (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/jobs/:jobId" element={<JobDetails />} />
              <Route path="/jobs/:jobId/graph" element={<GraphExplorer />} />
            </Routes>
          ) : (
            <div className="loading">Loading CareerGraph…</div>
          )}
        </main>
      </div>
    </CandidateContext.Provider>
  );
}
