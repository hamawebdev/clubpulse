import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 px-4">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/0.15),transparent_40%)]" />
      
      <Card className="w-full max-w-md shadow-lg border-muted/30">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;