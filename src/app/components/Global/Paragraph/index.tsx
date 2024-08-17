import React from "react";
import { twMerge } from "tailwind-merge";

type ParagraphSize = "small" | "medium" | "large";

type ParagraphProps = {
  children?: React.ReactNode;
  size?: ParagraphSize;
  className?: string;
};

const Paragraph = ({
  children,
  size = "medium",
  className,
}: ParagraphProps) => {
  switch (size) {
    case "small":
      return (
        <p className={twMerge("font-normal text-xs", className)}>{children}</p>
      );
    case "medium":
      return (
        <p className={twMerge("font-normal text-sm", className)}>{children}</p>
      );
    case "large":
      return (
        <p className={twMerge("font-normal text-lg", className)}>{children}</p>
      );
  }
};

export default Paragraph;
