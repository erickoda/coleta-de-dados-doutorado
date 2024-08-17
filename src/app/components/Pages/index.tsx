"use client";

import { usePages } from "@/app/context/pages";

const PageRenderer = () => {
  const { actual_page } = usePages();

  return <>{actual_page}</>;
};

export default PageRenderer;
