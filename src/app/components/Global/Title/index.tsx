"use client";

import React from "react";

type TitleProps = {
  children?: React.ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return <h3 className="font-bold text-2xl">{children}</h3>;
};

export default Title;
