import axios from '@/lib/axios';

const API_URL = 'http://127.0.0.1:8000/api';

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
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  async signup(credentials: SignupCredentials) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, credentials, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  },

  async logout() {
    try {
      // Call the logout endpoint if user is authenticated
      if (this.isAuthenticated()) {
        await axios.post(`${API_URL}/auth/logout`, {}, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
  
  // Utility method to test the authentication flow
  async testAuthentication() {
    try {
      console.log('Testing authentication flow...');
      
      // Test registration with unique email
      const testEmail = `test${Date.now()}@example.com`;
      console.log(`Attempting to register with ${testEmail}`);
      
      const registerResponse = await this.signup({
        name: "Test User",
        email: testEmail,
        password: "password123",
        password_confirmation: "password123",
        role: "user"
      });
      console.log("Registration successful:", registerResponse);
      
      // Test logout
      await this.logout();
      console.log("Logout successful, authentication status:", this.isAuthenticated());
      
      // Test login
      console.log(`Attempting to login with ${testEmail}`);
      const loginResponse = await this.login({
        email: testEmail,
        password: "password123"
      });
      console.log("Login successful:", loginResponse);
      
      // Get current user
      const userInfo = this.getCurrentUser();
      console.log("Current user:", userInfo);
      
      // Test logout again
      await this.logout();
      console.log("Final logout successful, authentication status:", this.isAuthenticated());
      
      return true;
    } catch (error) {
      console.error("Authentication test failed:", error);
      return false;
    }
  }
};