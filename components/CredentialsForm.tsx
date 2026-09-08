'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Mode = 'signin' | 'register';

export function CredentialsForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      if (mode === 'register') {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          setError(data?.error ?? 'Could not create your account.');
          return;
        }
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          mode === 'register'
            ? 'Account created, but sign-in failed. Try signing in instead.'
            : 'Invalid email or password.',
        );
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {mode === 'register' && (
        <div className="form-group">
          <label className="form-label" htmlFor="credentials-name">
            Name
          </label>
          <input
            id="credentials-name"
            className="form-input"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
          />
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="credentials-email">
          Email
        </label>
        <input
          id="credentials-email"
          className="form-input"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="credentials-password">
          Password
        </label>
        <input
          id="credentials-password"
          className="form-input"
          type="password"
          autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === 'register' ? 'At least 8 characters' : 'Your password'}
        />
      </div>

      {error && (
        <p
          role="alert"
          style={{
            color: 'var(--color-danger)',
            fontSize: '14px',
            margin: 0,
          }}
        >
          {error}
        </p>
      )}

      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={pending}
        style={{ minHeight: '44px' }}
      >
        {pending
          ? mode === 'register'
            ? 'Creating account…'
            : 'Signing in…'
          : mode === 'register'
            ? 'Create Account'
            : 'Sign In with Email'}
      </button>

      <p
        className="text-muted"
        style={{ textAlign: 'center', fontSize: '14px', margin: 0 }}
      >
        {mode === 'signin' ? (
          <>
            New here?{' '}
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => switchMode('register')}
            >
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => switchMode('signin')}
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </form>
  );
}
