import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your API URL

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  signup: async (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign up');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },
};

  async logout() {
    const response = await axios.post(`${API_URL}/auth/logout`);

    return response.data;
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};