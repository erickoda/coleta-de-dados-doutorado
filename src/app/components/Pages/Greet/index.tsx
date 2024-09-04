import React from "react";
import Title from "../../Global/Title";
import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";

const Greet = () => {
  const { go_to_previous_page } = usePages();

  return (
    <>
      <Title>
        Mais uma vez muito obrigada pela sua participação, a ciência agradece!
      </Title>

      <Button onClick={() => go_to_previous_page()}>Aqui</Button>
    </>
  );
};

export default Greet;
