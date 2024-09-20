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
        <Title>Fim do Treino! Agora é Para Valer!</Title>
        <Paragraph>
          Caso tenha alguma dúvida entre em contato com a pesquisadora
          (gstiburcio@usp.br), por favor. Caso não haja dúvidas, por favor,
          prossiga para a próxima seção.
        </Paragraph>
        <Paragraph>
          Lembre-se: sua participação é muito importante para nós! 😊
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

export default Start;
