// components/DefaultLayout.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase authentication
import Sidebar from './Siderbar';
import Header from './Header';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/'); // Redirect to login if not authenticated
      } else {
        setLoading(false); // User is authenticated, stop loading
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, [router]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content */}
      <div className="flex flex-col h-full lg:pl-64">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-white shadow-md overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
