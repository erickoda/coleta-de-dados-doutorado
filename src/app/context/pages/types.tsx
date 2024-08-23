import React from "react";

export type PagesProviderProps = {
  children: React.ReactNode;
};

type PageContext = {
  actual_page: React.ReactNode;
  actual_page_index: number;
  conclusion_percentage: number;

  go_to_next_page: () => void;
  go_to_previous_page: () => void;
};

export default PageContext;
