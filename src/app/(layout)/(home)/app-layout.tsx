import { cookies } from 'next/headers';
import { ErrorBoundary } from '@/components/error-boundary';


export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sidebarDefaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  console.log({ sidebarDefaultOpen })

  return (
    <>
      <ErrorBoundary>{children}</ErrorBoundary>
    </>
  );
}
