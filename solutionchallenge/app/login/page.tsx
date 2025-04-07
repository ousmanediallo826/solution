'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Label } from '../../components/ui/label'

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential) window.location.href = '/dashboard'
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
    <div className="relative min-h-screen flex items-center justify-center bg-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 via-purple-700 to-pink-500 animate-pulse opacity-20 blur-3xl" />

      <Card className="w-full max-w-md z-10 backdrop-blur-md bg-white/80 dark:bg-black/30 shadow-2xl border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Login to your account</p>
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="relative text-center">
            <span className="px-4 text-sm text-muted-foreground bg-white dark:bg-black z-10 relative">OR CONTINUE WITH</span>
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-t border-muted" />
          </div>

          <Button
            onClick={handleGitHubLogin}
            className="w-full bg-black hover:bg-gray-900 text-white"
            variant="outline"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49v-1.71c-2.79.61-3.37-1.35-3.37-1.35-.46-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.12-4.56-5a3.91 3.91 0 0 1 1.04-2.71 3.64 3.64 0 0 1 .1-2.68s.84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.3 2.74-1.02 2.74-1.02.38.87.42 1.82.1 2.68a3.9 3.9 0 0 1 1.04 2.71c0 3.88-2.35 4.74-4.58 5 .36.31.69.92.69 1.86v2.76c0 .27.16.59.67.49A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z"
              />
            </svg>
            GitHub
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
