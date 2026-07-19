'use client';

import React from 'react';
import { AddUserForm } from '@/components/users/AddUserForm';
import { useRouter } from 'next/navigation';
import { usersApi } from '@/lib/api/users';
import type { UserFormData } from '@/lib/validations/user.schema';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * Add User Page
 * Protected route - only accessible by authenticated users
 */
export default function AddUserPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isCreating, setIsCreating] = React.useState(false);

  // Check authentication and role
  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (!authLoading && user?.role !== 'admin') {
      router.push('/unauthorized');
    }
  }, [user, authLoading, router]);

  const handleCreateUser = async (data: UserFormData) => {
    setIsCreating(true);
    try {
      await usersApi.create(data);
      setTimeout(() => {
        router.push('/admin/users');
      }, 1000);
    } catch (error) {
      setIsCreating(false);
      throw error;
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container py-8">
      <AddUserForm onSubmit={handleCreateUser} isLoading={isCreating} />
    </div>
  );
}
