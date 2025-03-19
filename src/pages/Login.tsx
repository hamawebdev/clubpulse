import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Static credentials for testing
const VALID_CREDENTIALS = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'club@example.com', password: 'club123', role: 'club' }
];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = VALID_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );

    if (user) {
      try {
        localStorage.setItem('user', JSON.stringify(user));
        
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });

        // Navigate based on user role with correct paths
        setTimeout(() => {
          const path = user.role === 'admin' ? '/dashboard/admin' : '/dashboard/club';
          navigate(path, { replace: true });
        }, 100);

      } catch (error) {
        console.error('Navigation error:', error);
        toast({
          title: "Error",
          description: "Error during navigation",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="user@example.com"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;