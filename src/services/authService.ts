import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your API URL

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
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

  async signup(credentials: SignupCredentials) {
    const response = await axios.post('/auth/register', credentials, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
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