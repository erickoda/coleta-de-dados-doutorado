import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";
import React from "react";

const StartStimulus = () => {
  const { go_to_next_page } = usePages();

  return (
    <>
      <Button fullWidth variant="contained" onClick={() => go_to_next_page()}>
        Iniciar Apresentação do Estímulo
      </Button>
    </>
  );
};

export default StartStimulus;
