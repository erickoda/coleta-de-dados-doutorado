"use client";

import { createContext, useContext, useState } from "react";
import PageContext, { PagesProviderProps } from "./types";
import ConsentStatement from "@/app/components/Pages/ConsentStatement";
import PersonalData from "@/app/components/Pages/PersonalData";
import Instructions from "@/app/components/Pages/Instructions";

const PagesContext = createContext<PageContext>({} as PageContext);

function PagesProvider({ children }: PagesProviderProps) {
  const [actual_page, set_actual_page] = useState<React.ReactNode>(
    <ConsentStatement />
  );

  const [actual_page_index, set_actual_page_index] = useState<number>(0);

  const PagesQueue: JSX.Element[] = [
    <ConsentStatement />,
    <PersonalData />,
    <Instructions />,
  ];

  const go_to_next_page = () => {
    if (actual_page_index < PagesQueue.length - 1) {
      set_actual_page_index(actual_page_index + 1);
      set_actual_page(PagesQueue[actual_page_index + 1]);
    }
  };

  const go_to_previous_page = () => {
    if (actual_page_index > 0) {
      set_actual_page_index(actual_page_index - 1);
      set_actual_page(PagesQueue[actual_page_index - 1]);
    }
  };

  return (
    <PagesContext.Provider
      value={{
        actual_page,
        set_actual_page,
        go_to_next_page,
        go_to_previous_page,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
}

function usePages() {
  const context = useContext(PagesContext);
  if (!context) {
    throw new Error("usePages must be used within a PagesProvider");
  }
  return context;
}

export { PagesProvider, usePages };
