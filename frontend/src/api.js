// Base URL for all API calls.
// In development (Docker / local), VITE_API_URL is unset so this is '',
// and the Vite dev-server proxy forwards /api/* to the backend container.
// In production (Vercel), VITE_API_URL is set to the Render backend URL.
export const API = import.meta.env.VITE_API_URL ?? '';
