import React from "react";

type RootProps = {
  children?: React.ReactNode;
};

const Root = ({ children }: RootProps) => {
  return <>{children}</>;
};

export default Root;
