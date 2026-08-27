'use client';

import { useState } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';
import { useAuthStore, useAppStore } from '@/lib/store';
import { useDict } from '@/lib/i18n';

export default function AuthModal() {
  const d = useDict();
  const { showAuth, setShowAuth, login } = useAuthStore();
  const { showToast } = useAppStore();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!showAuth) return null;

  const close = () => {
    setShowAuth(false);
    setError('');
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const isLogin = tab === 'login';
    if (isLogin ? !loginEmail || !loginPassword : !signupName || !signupEmail || !signupPassword) {
      setError(isLogin ? d.auth.fillAll : d.auth.fillRequired);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isLogin
            ? { action: 'login', email: loginEmail, password: loginPassword }
            : { action: 'signup', name: signupName, email: signupEmail, phone: signupPhone, password: signupPassword }
        ),
      });
      const json = await res.json();
      if (json.success) {
        login(json.data.user, json.data.token);
        setShowAuth(false);
        showToast(d.auth.welcome);
      } else {
        setError(json.error || (isLogin ? d.auth.loginError : d.auth.signupError));
      }
    } catch {
      setError(d.auth.serverError);
    } finally {
      setSubmitting(false);
    }
  }

  const field =
    'w-full rounded-[10px] border border-ink/15 bg-paper px-3.5 py-3 text-base text-ink ' +
    'placeholder:text-ink-2/50 focus:border-petrol-500 focus:outline-none transition-[border-color] duration-200';
  const label = 'label-tight mb-2 block text-[11px] text-ink-2';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tab === 'login' ? d.auth.loginTitle : d.auth.signupTitle}
        className="relative w-full max-w-md rounded-[20px] bg-paper p-7 shadow-[0_40px_80px_-30px_rgba(20,35,28,0.8)] md:p-8"
      >
        <button
          onClick={close}
          aria-label={d.auth.close}
          className="pressable absolute right-4 top-4 rounded-full p-2 text-ink-2 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
        >
          <X size={20} />
        </button>

        <h2 className="font-poster text-[clamp(1.6rem,4vw,2.2rem)] text-ink">
          {tab === 'login' ? d.auth.loginTitle : d.auth.signupTitle}
        </h2>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {tab === 'signup' && (
            <>
              <div>
                <label htmlFor="a-name" className={label}>{d.auth.name}</label>
                <input id="a-name" className={field} value={signupName} onChange={(e) => setSignupName(e.target.value)} autoComplete="name" />
              </div>
              <div>
                <label htmlFor="a-phone" className={label}>{d.auth.phone}</label>
                <input id="a-phone" type="tel" className={field} value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)} placeholder="+33 6 XX XX XX XX" autoComplete="tel" />
              </div>
            </>
          )}

          <div>
            <label htmlFor="a-mail" className={label}>{d.auth.email}</label>
            <input
              id="a-mail"
              type="email"
              className={field}
              value={tab === 'login' ? loginEmail : signupEmail}
              onChange={(e) => (tab === 'login' ? setLoginEmail : setSignupEmail)(e.target.value)}
              placeholder={d.carDetail.emailPlaceholder}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="a-pass" className={label}>{d.auth.password}</label>
            <input
              id="a-pass"
              type="password"
              className={field}
              value={tab === 'login' ? loginPassword : signupPassword}
              onChange={(e) => (tab === 'login' ? setLoginPassword : setSignupPassword)(e.target.value)}
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <p role="alert" className="flex items-start gap-2 rounded-[10px] bg-terra-300/35 px-3.5 py-3 text-[14px] font-semibold text-terra-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="pressable flex w-full items-center justify-center gap-2 rounded-[12px] bg-petrol-600 px-6 py-3.5 text-base font-bold text-paper transition-colors duration-200 hover:bg-petrol-700 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {submitting && <Loader2 size={18} className="animate-spin" />}
            {tab === 'login' ? d.auth.login : d.auth.signup}
          </button>
        </form>

        <p className="mt-5 text-center text-[14px] text-ink-2">
          {tab === 'login' ? d.auth.noAccount : d.auth.hasAccount}{' '}
          <button
            onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setError(''); }}
            className="font-bold text-petrol-600 underline underline-offset-4 hover:text-petrol-700"
          >
            {tab === 'login' ? d.auth.signup : d.auth.login}
          </button>
        </p>
      </div>
    </div>
  );
}
