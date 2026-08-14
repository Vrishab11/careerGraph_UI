import React from 'react';

function colorFor(pct) {
  if (pct >= 75) return 'var(--score-high)';
  if (pct >= 45) return 'var(--score-mid)';
  return 'var(--score-low)';
}

export default function MatchScore({ percentage, size = 'md' }) {
  return (
    <div className={`match-score match-score--${size}`}>
      <div className="match-score-bar-track">
        <div
          className="match-score-bar-fill"
          style={{ width: `${percentage}%`, background: colorFor(percentage) }}
        />
      </div>
      <span className="match-score-label" style={{ color: colorFor(percentage) }}>
        {percentage}% Match
      </span>
    </div>
  );
}
