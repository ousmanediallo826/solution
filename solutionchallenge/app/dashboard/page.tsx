'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Adjust to your actual firebase configuration path
//solutionchallenge\app\dashboard\display\page.tsx
import Home from '../dashboard/display/page'
import Header from '../dashboard/components/header/base-header'; 
const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null); // State to store user information
  const [loading, setLoading] = useState(true); // Loading state to handle auth state check

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false); // Set loading to false after the auth state is determined
      if (currentUser) {
        setUser(currentUser); // If the user is authenticated, update the user state
      } else {
        router.push('/auth/signin'); // Redirect if user is not authenticated
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    // Optionally show a loading state while checking the authentication status
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user && (
        <>
          <Header/>
          <h1>Welcome, {user.email}</h1>
          <Home/>
        </>
      )}
    </div>
  );
};

export default Page;
