import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <main className="flex col min-h-screen bg-neutral-300 flex-col items-center justify-center p-2">
        <div className="flex flex-col items-start justify-start bg-neutral-100 rounded p-4 text-neutral-900 max-w-3xl space-y-3">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
