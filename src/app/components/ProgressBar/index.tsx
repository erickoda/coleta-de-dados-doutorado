import { usePages } from "@/app/context/pages";
import React from "react";

const ProgressBar = () => {
  const { conclusion_percentage } = usePages();

  return (
    <>
      <div className="w-full bg-neutral-500 h-1">
        <div
          className="bg-neutral-100 h-1"
          style={{ width: `${conclusion_percentage}%` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
