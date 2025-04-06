"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../lib/firebase'

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential) {
        window.location.href = '/dashboard'
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('User not found. Please check your email address.')
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.')
      } else {
        setError('An error occurred. Please try again later.')
      }
    }
  }

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log('GitHub User:', user)
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('GitHub Sign-in Error:', error)
      setError('GitHub authentication failed. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg bg-white p-6 shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          {/* Add logo here if needed */}
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-semibold">Welcome back</h2>
        <p className="text-center text-gray-600">Login to your account</p>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500">OR CONTINUE WITH</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* GitHub Login Button */}
        <button
          onClick={handleGitHubLogin}
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

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page
