'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuthStore, useAppStore } from '@/lib/store';

export default function AuthModal() {
  const { showAuth, setShowAuth, login } = useAuthStore();
  const { showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const [submitting, setSubmitting] = useState(false);

  if (!showAuth) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      setLoginError('Veuillez remplir tous les champs');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email: loginEmail, password: loginPassword }),
      });
      const json = await res.json();
      if (json.success) {
        login(json.data.user, json.data.token);
        setShowAuth(false);
        showToast('Bienvenue !');
      } else {
        setLoginError(json.error || 'Erreur de connexion');
      }
    } catch {
      setLoginError('Erreur de connexion au serveur');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'signup',
          name: signupName,
          email: signupEmail,
          phone: signupPhone,
          password: signupPassword,
        }),
      });
      const json = await res.json();
      if (json.success) {
        login(json.data.user, json.data.token);
        setShowAuth(false);
        showToast('Bienvenue !');
      } else {
        setSignupError(json.error || 'Erreur lors de l\'inscription');
      }
    } catch {
      setSignupError('Erreur de connexion au serveur');
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    setShowAuth(false);
    setLoginError('');
    setSignupError('');
  };

  return (
    <div
      className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className='bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative mx-4'>
        {/* Close button */}
        <button
          onClick={close}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-700'
        >
          <X size={20} />
        </button>

        {/* Tabs */}
        <div className='flex gap-6 mb-6'>
          {(['login', 'signup'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setLoginError('');
                setSignupError('');
              }}
              className={`pb-2 text-sm font-semibold transition-colors font-[Inter] ${
                activeTab === tab
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab === 'login' ? 'Connexion' : 'Inscription'}
            </button>
          ))}
        </div>

        {/* Login form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1 font-[Inter]'>Email</label>
              <input
                type='email'
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder='votre@email.com'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1 font-[Inter]'>Mot de passe</label>
              <input
                type='password'
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder='••••••••'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]'
              />
            </div>
            {loginError && (
              <p className='text-sm text-red-600 font-[Inter]'>{loginError}</p>
            )}
            <button
              type='submit'
              disabled={submitting}
              className='w-full py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-[Inter]'
            >
              {submitting && <Loader2 size={16} className='animate-spin' />}
              Se Connecter
            </button>
          </form>
        )}

        {/* Signup form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignup} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1 font-[Inter]'>Nom</label>
              <input
                type='text'
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder='Jean Dupont'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1 font-[Inter]'>Email</label>
              <input
                type='email'
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder='votre@email.com'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1 font-[Inter]'>Telephone</label>
              <input
                type='tel'
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
                placeholder='+33 6 XX XX XX XX'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1 font-[Inter]'>Mot de passe</label>
              <input
                type='password'
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder='••••••••'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-[Inter]'
              />
            </div>
            {signupError && (
              <p className='text-sm text-red-600 font-[Inter]'>{signupError}</p>
            )}
            <button
              type='submit'
              disabled={submitting}
              className='w-full py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-[Inter]'
            >
              {submitting && <Loader2 size={16} className='animate-spin' />}
              Creer un compte
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
