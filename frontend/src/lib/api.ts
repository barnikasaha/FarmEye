// lib/api.ts

const BASE_URL = 'http://localhost:5000';

export async function login(enrollment: string, password: string) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enrollment, password })
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Invalid credentials");
  }
  
  return res.json();
}

export async function fetchDashboard() {
  const res = await fetch(`${BASE_URL}/dashboard`);
  if (!res.ok) {
    throw new Error("Failed to load dashboard data");
  }
  return res.json();
}

export async function fetchAiAnalysis(dashboardData: any) {
  const res = await fetch(`${BASE_URL}/ai-analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dashboardData)
  });
  
  if (!res.ok) {
    throw new Error("AI analysis failed");
  }
  
  return res.json();
}
