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
      <main className="flex col min-h-screen bg-neutral-900 flex-col items-center justify-center">
        <div className="flex flex-col items-start justify-start bg-neutral-700 rounded-base p-4 text-neutral-100 max-w-3xl space-y-3">
          {children}

          <div className="grid grid-cols-3 gap-4">
            {userAnswers.time_spent.map((time, index) => (
              <div key={index}>
                <Title>Bloco {index + 1}</Title>
                <Paragraph>Final: {time.initial}</Paragraph>
                <Paragraph>Final: {time.final}</Paragraph>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
