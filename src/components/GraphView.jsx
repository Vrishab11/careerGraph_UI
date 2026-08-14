import React, { useMemo } from 'react';

const TYPE_COLUMN = {
  Candidate: 0,
  Project: 1,
  Skill: 2,
  MissingSkill: 2,
  Job: 3,
  Company: 4,
};

const TYPE_COLOR = {
  Candidate: '#6366f1',
  Project: '#0ea5e9',
  Skill: '#22c55e',
  MissingSkill: '#f97316',
  Job: '#a855f7',
  Company: '#64748b',
};

const COL_WIDTH = 190;
const ROW_HEIGHT = 64;
const NODE_R = 8;

export default function GraphView({ nodes, edges }) {
  const { positioned, width, height } = useMemo(() => {
    const columns = {};
    nodes.forEach((n) => {
      const col = TYPE_COLUMN[n.type] ?? 2;
      columns[col] = columns[col] || [];
      columns[col].push(n);
    });

    const positioned = {};
    let maxRows = 1;
    Object.entries(columns).forEach(([col, list]) => {
      maxRows = Math.max(maxRows, list.length);
      list.forEach((n, i) => {
        positioned[n.id] = {
          ...n,
          x: Number(col) * COL_WIDTH + 90,
          y: i * ROW_HEIGHT + 60,
        };
      });
    });

    const width = (Math.max(...Object.keys(columns).map(Number)) + 1) * COL_WIDTH + 60;
    const height = maxRows * ROW_HEIGHT + 80;
    return { positioned, width, height };
  }, [nodes]);

  return (
    <div className="graph-view-scroll">
      <svg width={width} height={height} className="graph-view-svg">
        {edges.map((e, i) => {
          const from = positioned[e.from];
          const to = positioned[e.to];
          if (!from || !to) return null;
          const midX = (from.x + to.x) / 2;
          return (
            <g key={i}>
              <path
                d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                fill="none"
                stroke="var(--edge-color)"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <text
                x={midX}
                y={(from.y + to.y) / 2 - 4}
                fontSize="9"
                fill="var(--edge-label-color)"
                textAnchor="middle"
              >
                {e.label}
              </text>
            </g>
          );
        })}

        {Object.values(positioned).map((n) => (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
            <circle r={NODE_R} fill={TYPE_COLOR[n.type] || '#94a3b8'} stroke="#fff" strokeWidth="2" />
            <text x={NODE_R + 6} y={4} fontSize="11" fill="var(--text-primary)">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
