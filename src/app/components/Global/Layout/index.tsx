import { useAnswers } from "@/app/context/answers";
import React from "react";
import Title from "../Title";
import Paragraph from "../Paragraph";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { userAnswers } = useAnswers();

  return (
    <>
      <main className="flex col min-h-screen bg-neutral-900 flex-col items-center justify-center p-2">
        <div className="flex flex-col items-start justify-start bg-neutral-700 rounded p-4 text-neutral-100 max-w-3xl space-y-3">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
