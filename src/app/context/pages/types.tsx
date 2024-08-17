import React from "react";

export type PagesProviderProps = {
  children: React.ReactNode;
};

type PageContext = {
  actual_page: React.ReactNode;
  set_actual_page: React.Dispatch<React.SetStateAction<React.ReactNode>>;

  go_to_next_page: () => void;
  go_to_previous_page: () => void;
};

export default PageContext;
