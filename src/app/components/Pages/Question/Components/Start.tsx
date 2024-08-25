import Paragraph from "@/app/components/Global/Paragraph";
import Title from "@/app/components/Global/Title";
import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";
import React from "react";

const Start = () => {
  const { go_to_next_page } = usePages();

  return (
    <>
      <div className="flex flex-col">
        <Title>Agora é Para Valer!</Title>
        <Paragraph>Por favor responda com atenção!</Paragraph>
      </div>
      <div className="w-full flex flex-row justify-center">
        <Button variant="contained" onClick={() => go_to_next_page()}>
          Continuar
        </Button>
      </div>
    </>
  );
};

export default Start;
