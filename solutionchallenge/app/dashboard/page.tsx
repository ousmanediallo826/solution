'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from '@tremor/react';
import { AppColumn } from '../src-google/ColumnChart';
import wages from '../app-data/wages';
import WageDashboard from '../src-google/filterChart';
import { motion } from 'framer-motion'; 
import { useTheme } from 'next-themes'; 
import { FaSun, FaMoon } from 'react-icons/fa';

const chartdata = [
  { name: 'Topic 1', 'Group A': 890, 'Group B': 338 },
  { name: 'Topic 2', 'Group A': 289, 'Group B': 233 },
];

const valueFormatter = (number: number) => `$ ${new Intl.NumberFormat('us').format(number).toString()}`;

const Page = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme(); 
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        setFirstName(extractFirstName(currentUser.email));
      } else {
        router.push('/auth/signin');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const extractFirstName = (email: string) => {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return email;
    return email.substring(0, atIndex);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className={`p-4 md:p-8 space-y-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} // Toggle background based on theme
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ transition: 'background-color 0.5s ease' }} 
    >
      {user && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Welcome back, {firstName}!</CardTitle>
              <CardDescription>Your dashboard is ready.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Button variant="destructive" onClick={handleSignOut}>
                Sign Out
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employment Overview (Tremor Example)</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                className="mt-6"
                data={chartdata}
                index="name"
                categories={['Group A', 'Group B']}
                colors={['blue', 'teal']}
                valueFormatter={valueFormatter}
                yAxisWidth={48}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Google Column Chart Section</CardTitle>
            </CardHeader>
            <CardContent>
              <AppColumn />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wage Dashboard Section</CardTitle>
            </CardHeader>
            <CardContent>
              <WageDashboard wages={wages} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>VChart Section</CardTitle>
            </CardHeader>
            <CardContent>
      
            </CardContent>
          </Card>

         
          <motion.div
            className="fixed top-2 right-4 flex items-center space-x-2 cursor-pointer"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            initial={{ rotate: 0 }}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }} 
            transition={{ duration: 0.3 }} 
          >
            <div className="text-xl">
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </div>
            <span className="hidden">Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Page;
