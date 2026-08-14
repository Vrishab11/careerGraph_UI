import React, { useEffect, useState } from 'react';
import { api } from '../api/api.js';
import { useCandidate } from '../App.jsx';
import JobCard from '../components/JobCard.jsx';

export default function Recommendations() {
  const { candidateId } = useCandidate();
  const [recs, setRecs] = useState(null);
  const [sortBy, setSortBy] = useState('match');

  useEffect(() => {
    if (!candidateId) return;
    setRecs(null);
    api.getRecommendations(candidateId, 50).then((r) => setRecs(r.recommendations));
  }, [candidateId]);

  if (!recs) return <div className="loading">Finding jobs connected to your graph…</div>;

  const sorted = [...recs].sort((a, b) => {
    if (sortBy === 'match') return b.matchPercentage - a.matchPercentage;
    if (sortBy === 'skills') return b.matchedSkillCount - a.matchedSkillCount;
    return 0;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1>Recommended Jobs</h1>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="match">Sort by match %</option>
          <option value="skills">Sort by matched skills</option>
        </select>
      </div>

      <div className="job-grid">
        {sorted.map((rec) => <JobCard key={rec.job.id} rec={rec} />)}
      </div>
    </div>
  );
}
