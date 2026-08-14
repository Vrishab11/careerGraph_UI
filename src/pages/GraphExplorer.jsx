import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/api.js';
import { useCandidate } from '../App.jsx';
import GraphView from '../components/GraphView.jsx';

const LEGEND = [
  { type: 'Candidate', color: '#6366f1' },
  { type: 'Project', color: '#0ea5e9' },
  { type: 'Skill (matched)', color: '#22c55e' },
  { type: 'Skill (missing)', color: '#f97316' },
  { type: 'Job', color: '#a855f7' },
  { type: 'Company', color: '#64748b' },
];

export default function GraphExplorer() {
  const { jobId } = useParams();
  const { candidateId } = useCandidate();
  const [graphData, setGraphData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!candidateId || !jobId) return;
    setGraphData(null);
    api.getExplanationGraph(candidateId, jobId).then(setGraphData);
  }, [candidateId, jobId]);

  if (!graphData) return <div className="loading">Building graph traversal…</div>;

  return (
    <div className="page">
      <button className="btn-link" onClick={() => navigate(-1)}>← Back to match</button>
      <h1>Graph Explorer</h1>
      <p className="muted">
        Every path connecting this candidate to this job through skills, projects, and related technologies.
      </p>

      <div className="legend-row">
        {LEGEND.map((l) => (
          <span key={l.type} className="legend-item">
            <span className="legend-dot" style={{ background: l.color }} /> {l.type}
          </span>
        ))}
      </div>

      <section className="panel graph-panel">
        <GraphView nodes={graphData.nodes} edges={graphData.edges} />
      </section>
    </div>
  );
}
