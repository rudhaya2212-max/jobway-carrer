import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowRight, Compass } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, setUser, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (authMode === 'signup' && name) {
      setUser(prev => ({
        ...prev,
        name,
        email
      }));
      showToast(`Account created for ${name}!`);
    } else {
      showToast('Logged in successfully');
    }
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-neutral-200/80 shadow-dropdown p-7 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 rounded-2xl bg-neutral-950 flex items-center justify-center text-white mb-3 shadow-subtle">
            <Compass className="h-6 w-6 stroke-[1.8]" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            {authMode === 'login' ? 'Log in to Job Way' : 'Create your account'}
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs">
            {authMode === 'login' 
              ? 'Access your personalized roadmaps and continuous Socratic AI mentor'
              : 'Join thousands of developers accelerating their career pathway'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex rounded-full bg-neutral-100 p-1 mb-5 border border-neutral-200/60">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
              authMode === 'login'
                ? 'bg-white text-neutral-900 shadow-subtle'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
              authMode === 'signup'
                ? 'bg-white text-neutral-900 shadow-subtle'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-subtle"
          >
            <span>{authMode === 'login' ? 'Continue with Email' : 'Create Free Account'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-[11px] text-neutral-400 text-center mt-5">
          By signing up, you agree to our Terms of Service & Privacy Policy.
        </p>

      </div>
    </div>
  );
};
