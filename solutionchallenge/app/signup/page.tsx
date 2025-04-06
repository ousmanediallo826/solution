'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try another.');
      } else if (err.code === 'auth/weak-password') {
        setError('The password is too weak. Please choose a stronger password.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleGitHubSignup = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('GitHub User:', user);
      router.push('/dashboard');
    } catch (error) {
      console.error('GitHub Sign-up Error:', error);
      setError('GitHub authentication failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-center text-2xl font-semibold">Create an Account</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500">OR CONTINUE WITH</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* GitHub Signup Button */}
        <button
          onClick={handleGitHubSignup}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-black bg-black px-4 py-2 text-white font-semibold hover:bg-gray-900"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49v-1.71c-2.79.61-3.37-1.35-3.37-1.35-.46-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.12-4.56-5a3.91 3.91 0 0 1 1.04-2.71 3.64 3.64 0 0 1 .1-2.68s.84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.3 2.74-1.02 2.74-1.02.38.87.42 1.82.1 2.68a3.9 3.9 0 0 1 1.04 2.71c0 3.88-2.35 4.74-4.58 5 .36.31.69.92.69 1.86v2.76c0 .27.16.59.67.49A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z"
              clipRule="evenodd"
            />
          </svg>
          Github
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
