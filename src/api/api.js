const BASE = '/api';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${path}`);
  return res.json();
}

export const api = {
  listCandidates: () => get('/candidates'),
  getCandidate: (id) => get(`/candidates/${id}`),
  listJobs: () => get('/jobs'),
  getJob: (id) => get(`/jobs/${id}`),
  getRecommendations: (candidateId, limit = 20) => get(`/recommendations/${candidateId}?limit=${limit}`),
  getMatchDetail: (candidateId, jobId) => get(`/recommendations/${candidateId}/${jobId}`),
  getExplanationGraph: (candidateId, jobId) => get(`/recommendations/${candidateId}/${jobId}/graph`),
};
