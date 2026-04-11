import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(true);

  const persistAuth = useCallback((nextToken, nextUser) => {
    if (nextToken) {
      localStorage.setItem('token', nextToken);
      setToken(nextToken);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }

    if (nextUser) {
      localStorage.setItem('user', JSON.stringify(nextUser));
      setUser(nextUser);
    } else {
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  const logout = useCallback(() => {
    persistAuth(null, null);
  }, [persistAuth]);

  const refreshMe = useCallback(async (incomingToken = token) => {
    if (!incomingToken) {
      setAuthLoading(false);
      return null;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${incomingToken}`,
        },
      });

      if (!res.ok) {
        logout();
        setAuthLoading(false);
        return null;
      }

      const data = await res.json();
      persistAuth(incomingToken, data);
      setAuthLoading(false);
      return data;
    } catch {
      logout();
      setAuthLoading(false);
      return null;
    }
  }, [token, logout, persistAuth]);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const login = useCallback(async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    persistAuth(data.token, data.user);
    await refreshMe(data.token);
    return data.user;
  }, [persistAuth, refreshMe]);

  const register = useCallback(async (name, email, password, role) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();
    if (!res.ok) {
      const msg = data.errors?.[0]?.msg || data.message || 'Registration failed';
      throw new Error(msg);
    }

    persistAuth(data.token, data.user);
    await refreshMe(data.token);
    return data.user;
  }, [persistAuth, refreshMe]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authLoading,
        login,
        register,
        logout,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}