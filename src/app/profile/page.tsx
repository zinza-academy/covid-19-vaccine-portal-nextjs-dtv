'use client';

import { useFetchProfileQuery } from '@/api/auth';
import LoadingPage from '@/components/base/loading-page';

export default function Profile() {
  const { data, isLoading } = useFetchProfileQuery({ token: 'auth_token' });
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <h1>Your Email: {data?.email}</h1>
    </div>
  );
}
