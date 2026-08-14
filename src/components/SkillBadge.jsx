import React from 'react';

export default function SkillBadge({ name, state = 'neutral', hint }) {
  const icon = state === 'matched' ? '✓' : state === 'missing' ? '○' : '•';
  return (
    <span className={`skill-badge skill-badge--${state}`} title={hint || ''}>
      <span className="skill-badge-icon">{icon}</span> {name}
    </span>
  );
}
