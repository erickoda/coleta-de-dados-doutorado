import Paragraph from "@/app/components/Global/Paragraph";
import Title from "@/app/components/Global/Title";
import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";
import React from "react";

const Test = () => {
  const { go_to_next_page } = usePages();

  return (
    <>
      <div className="flex flex-col items-center">
        <Title>Tutorial!</Title>
        <Paragraph>
          Essas duas primeiras questões são para ensinar a dinâmica das
          perguntas!
        </Paragraph>
      </div>
      <div className="w-full flex flex-row justify-center">
        <Button variant="contained" onClick={() => go_to_next_page()}>
          Continuar
        </Button>
      </div>
    </>
  );
};

export default Test;
