import Navbar from './_components/Navbar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/5">
        <Navbar />
      </div>
      <div className="w-4/5">
        {children}
      </div>
    </div>
  );
};

export default Layout;