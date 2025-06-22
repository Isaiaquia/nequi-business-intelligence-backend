
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <main className="flex-grow p-4 md:p-6 pb-20"> {/* pb-20 for bottom nav space */}
      {children}
    </main>
  );
};

export default PageWrapper;
    