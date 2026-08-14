import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api.js';
import { useCandidate } from '../App.jsx';
import SkillBadge from '../components/SkillBadge.jsx';

export default function Dashboard() {
  const { candidateId } = useCandidate();
  const [profile, setProfile] = useState(null);
  const [recCount, setRecCount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!candidateId) return;
    api.getCandidate(candidateId).then(setProfile);
    api.getRecommendations(candidateId, 50).then((r) =>
      setRecCount(r.recommendations.filter((x) => x.matchPercentage >= 40).length)
    );
  }, [candidateId]);

  if (!profile) return <div className="loading">Loading profile…</div>;

  return (
    <div className="page">
      <section className="hero-card">
        <h1>Welcome, {profile.name.split(' ')[0]}</h1>
        <p className="muted">
          {profile.location} · {profile.experienceYears} yr experience · prefers {profile.remotePreference ? 'remote' : 'on-site'}
        </p>

        <div className="stat-row">
          <div className="stat">
            <span className="stat-value">{profile.skills.length}</span>
            <span className="stat-label">Skills</span>
          </div>
          <div className="stat">
            <span className="stat-value">{profile.projects.length}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-value">{recCount ?? '…'}</span>
            <span className="stat-label">Recommended Jobs (≥40%)</span>
          </div>
        </div>

        <button className="btn-primary" onClick={() => navigate('/recommendations')}>
          Find Jobs →
        </button>
      </section>

      <div className="two-col">
        <section className="panel">
          <h2>Your Skills</h2>
          <div className="skill-badge-row">
            {profile.skills.map((s) => (
              <SkillBadge key={s.id} name={s.name} state="matched" hint={`${s.level}, ${s.years} yr`} />
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Your Projects</h2>
          {profile.projects.map((p) => (
            <div key={p.id} className="project-row">
              <div className="project-row-name">{p.name}</div>
              <div className="project-row-skills">{p.usedSkills.join(', ')}</div>
            </div>
          ))}
        </section>
      </div>

      {profile.preferredRoles.length > 0 && (
        <section className="panel">
          <h2>Preferred Roles</h2>
          <div className="skill-badge-row">
            {profile.preferredRoles.map((r) => (
              <SkillBadge key={r.id} name={r.name} state="neutral" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
