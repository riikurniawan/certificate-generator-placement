'use client';

import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { MenuItem } from 'primereact/menuitem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      label: 'Certificate Editor',
      icon: 'pi pi-file-edit',
      command: () => router.push('/'),
    },
    {
      label: 'Daftar Peserta',
      icon: 'pi pi-users',
      command: () => router.push('/participants'),
    },
  ];

  const end = (
    <div className="flex items-center gap-3">
      <Avatar 
        icon="pi pi-user" 
        style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} 
        shape="circle" 
        size="normal"
      />
      <span className="font-semibold hidden md:block text-gray-700">Admin</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top MenuBar */}
      <Menubar model={menuItems} end={end} className="shadow-md mb-0" />

      {/* Main Content */}
      <main className="p-4 md:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-sm">&copy; 2025 Certificate Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
