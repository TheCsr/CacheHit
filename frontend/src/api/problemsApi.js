const API_BASE_URL = 'http://localhost:5000/api/v1';

export const fetchProblems = async () => {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch problems');
  return res.json();
};

export const createProblem = async (problemData) => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(problemData),
  });
  if (!res.ok) throw new Error('Failed to create problem');
  return res.json();
};

export const reviewProblem = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}/review`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to mark problem as reviewed');
  return res.json();
};