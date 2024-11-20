"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

type TitleProps = {
  children?: React.ReactNode;
  className?: string;
};

const Title = ({ children, className }: TitleProps) => {
  return <h3 className={twMerge("font-bold text-2xl", className)}>{children}</h3>;
};

export default Title;
