import { headers } from 'next/headers';
import AppLayout from './(home)/app-layout';


export const experimental_ppr = true;

async function LayoutRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') ?? ''; // '/tos'

  console.log('current pathname:', pathname);

  return <AppLayout>{children}</AppLayout>;
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <LayoutRouter >{children}</LayoutRouter>;
};

export default Layout;
