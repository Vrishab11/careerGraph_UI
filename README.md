CareerGraph Client (Frontend)

A React app for CareerGraph — view a candidate's profile, see ranked job
recommendations, and explore why a candidate matches a job through an
interactive graph view.

Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build (output to `dist/`) |
| `npm run preview` | Preview the production build locally |

Pages
| Route | Page | Description |
|---|---|---|
| `/` | Dashboard | Selected candidate's skills, projects, and stats |
| `/recommendations` | Recommendations | Ranked job matches for the candidate |
| `/jobs/:jobId` | Job Details | Full match breakdown for one job |
| `/jobs/:jobId/graph` | Graph Explorer | Visual graph of why the candidate matches |

Project Structure
```
src/
├── main.jsx        # Entry point
├── App.jsx          # Layout, nav, candidate switcher
├── api/             # Calls to the backend API
├── pages/           # Dashboard, Recommendations, JobDetails, GraphExplorer
├── components/       # JobCard, MatchScore, SkillBadge, GraphView
└── styles/           # CSS
```

Notes
- The UI design (layout, color palette, and component styling) was created
  with the help of AI.
