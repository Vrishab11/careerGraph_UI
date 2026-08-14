import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatchScore from './MatchScore.jsx';
import SkillBadge from './SkillBadge.jsx';

export default function JobCard({ rec }) {
  const navigate = useNavigate();
  const { job, company, role, matchPercentage, matchedSkills, missingSkills } = rec;

  return (
    <div className="job-card" onClick={() => navigate(`/jobs/${job.id}`)}>
      <div className="job-card-header">
        <div>
          <h3>{job.title}</h3>
          <p className="job-card-sub">{company?.name} {role ? `· ${role.name}` : ''}</p>
        </div>
        <span className="job-card-location">{job.remote ? 'Remote' : job.location}</span>
      </div>

      <MatchScore percentage={matchPercentage} />

      <div className="skill-badge-row">
        {matchedSkills.slice(0, 4).map((s) => <SkillBadge key={s} name={s} state="matched" />)}
        {missingSkills.slice(0, 2).map((s) => <SkillBadge key={s} name={s} state="missing" />)}
      </div>

      <button className="btn-link" onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.id}`); }}>
        View Match →
      </button>
    </div>
  );
}
