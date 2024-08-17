"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

type LabelProps = {
  children?: React.ReactNode;
  htmlFor?: string;
  className?: string;
};

const Label = ({ children, htmlFor, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge("font-bold text-sm", className)}
    >
      {children}
    </label>
  );
};

export default Label;
