import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="flex col min-h-screen bg-neutral-900 flex-col items-center justify-center">
        <div className="flex flex-col items-start justify-start bg-neutral-700 rounded-base p-4 text-neutral-100 max-w-3xl space-y-3">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
