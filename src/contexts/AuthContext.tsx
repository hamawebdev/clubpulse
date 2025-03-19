import React, { createContext, useContext, useState, useEffect } from 'react';

// Static credentials for demo
const STATIC_USERS = {
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  club: {
    email: 'club@example.com',
    password: 'club123',
    role: 'club',
    name: 'Club Manager'
  }
};

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string, password_confirmation: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check static credentials
    const adminUser = STATIC_USERS.admin;
    const clubUser = STATIC_USERS.club;

    let matchedUser = null;

    if (email === adminUser.email && password === adminUser.password) {
      matchedUser = adminUser;
    } else if (email === clubUser.email && password === clubUser.password) {
      matchedUser = clubUser;
    }

    if (matchedUser) {
      setUser(matchedUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(matchedUser));
      return { user: matchedUser };
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    role: string
  ) => {
    throw new Error('Signup is not implemented in demo mode');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};