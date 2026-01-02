// LORE Login Page - Ai.telier V2 Brutalismo Poetico
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setError(error.message);
      } else if (isSignUp) {
        setError('Check your email for confirmation link');
      } else {
        navigate('/lore');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void-black flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Back to home */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-warm-ivory/60 hover:text-warm-ivory transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Ai.telier</span>
        </button>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-tech-olive flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-void-black" />
            </div>
          </div>
          <h1 className="text-3xl font-bold font-space-grotesk text-warm-ivory">LORE</h1>
          <p className="text-warm-ivory/60">AI-First Knowledge Base</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-warm-ivory/80 mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-void-black border-warm-ivory/20 text-warm-ivory placeholder:text-warm-ivory/40 focus:border-tech-olive"
              />
            </div>
            <div>
              <label className="block text-sm text-warm-ivory/80 mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                minLength={6}
                className="bg-void-black border-warm-ivory/20 text-warm-ivory placeholder:text-warm-ivory/40 focus:border-tech-olive"
              />
            </div>
          </div>

          {error && (
            <div className={`p-3 text-sm ${error.includes('Check your email') ? 'bg-tech-olive/20 text-tech-olive' : 'bg-red-500/20 text-red-400'}`}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-tech-olive text-void-black hover:bg-tech-olive/90 font-medium py-6"
          >
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        {/* Toggle */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-sm text-warm-ivory/60 hover:text-tech-olive transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-warm-ivory/40">
          Powered by Supabase Auth
        </div>
      </div>
    </div>
  );
}
