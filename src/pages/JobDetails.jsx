import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/api.js';
import { useCandidate } from '../App.jsx';
import MatchScore from '../components/MatchScore.jsx';
import SkillBadge from '../components/SkillBadge.jsx';

function BreakdownBar({ label, value }) {
  return (
    <div className="breakdown-row">
      <span className="breakdown-label">{label}</span>
      <div className="breakdown-track">
        <div className="breakdown-fill" style={{ width: `${value}%` }} />
      </div>
      <span className="breakdown-value">{value}%</span>
    </div>
  );
}

export default function JobDetails() {
  const { jobId } = useParams();
  const { candidateId } = useCandidate();
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!candidateId || !jobId) return;
    setDetail(null);
    api.getMatchDetail(candidateId, jobId).then(setDetail);
  }, [candidateId, jobId]);

  if (!detail) return <div className="loading">Loading match details…</div>;

  const { job, company, role, matchPercentage, breakdown, matchedSkills, missingSkills } = detail;

  return (
    <div className="page">
      <button className="btn-link" onClick={() => navigate(-1)}>← Back</button>

      <section className="hero-card">
        <h1>{job.title}</h1>
        <p className="muted">{company?.name} {role ? `· ${role.name}` : ''} · {job.remote ? 'Remote' : job.location}</p>
        <MatchScore percentage={matchPercentage} size="lg" />
        <button className="btn-primary" onClick={() => navigate(`/jobs/${job.id}/graph`)}>
          View Graph Explanation →
        </button>
      </section>

      <div className="two-col">
        <section className="panel">
          <h2>Required Skills</h2>
          <div className="skill-badge-row">
            {matchedSkills.map((s) => (
              <SkillBadge
                key={s.skillId}
                name={s.name}
                state="matched"
                hint={s.provenByProject ? `Demonstrated via project: ${s.project?.name}` : 'Listed skill'}
              />
            ))}
            {missingSkills.map((s) => (
              <SkillBadge
                key={s.skillId}
                name={s.name}
                state="missing"
                hint={s.relatedSuggestion ? `Related to your ${s.relatedSuggestion.via} experience` : 'Not yet demonstrated'}
              />
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Score Breakdown</h2>
          <BreakdownBar label="Skill match" value={breakdown.skillMatch} />
          <BreakdownBar label="Project evidence" value={breakdown.projectEvidence} />
          <BreakdownBar label="Experience match" value={breakdown.experienceMatch} />
          <BreakdownBar label="Role preference" value={breakdown.rolePreference} />
          <BreakdownBar label="Location" value={breakdown.location} />
        </section>
      </div>

      <section className="panel">
        <h2>Why you're a good match</h2>
        {matchedSkills.filter((s) => s.provenByProject).length === 0 && (
          <p className="muted">No project-verified skills yet for this role — matches below come from your listed skills.</p>
        )}
        {matchedSkills.filter((s) => s.provenByProject).map((s) => (
          <p key={s.skillId} className="explanation-line">
            Your <strong>{s.project.name}</strong> project → used <strong>{s.name}</strong> → required by this job
          </p>
        ))}
        {missingSkills.filter((s) => s.relatedSuggestion).map((s) => (
          <p key={s.skillId} className="explanation-line explanation-line--gap">
            You don't list <strong>{s.name}</strong>, but it's closely related to your <strong>{s.relatedSuggestion.via}</strong> experience
          </p>
        ))}
      </section>
    </div>
  );
}
