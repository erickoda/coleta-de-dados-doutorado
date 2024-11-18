"use client";

import React, { useEffect } from "react";
import Title from "../../Global/Title";
import Paragraph from "../../Global/Paragraph";
import { Button, Tooltip } from "@mui/material";
import { usePages } from "@/app/context/pages";

const Instructions = () => {
  const { go_to_next_page, go_to_previous_page } = usePages();

  const [isStartAvailable, setIsStartAvailable] = React.useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsStartAvailable(true), 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-1">
        <Title>Aviso!</Title>
        <Paragraph>
        Por favor, durante o experimento utilize um fone de ouvido e o
        mantenha em um volume confortável, procure permanecer sentado(a) numa posição cômoda e relaxada,
        sem distrações. 
          <b> Lembre-se: sua participação é muito importante para nós.</b>
        </Paragraph>
      </div>

      <div className="flex flex-col space-y-1">
        <h4 className="text-lg font-bold">Passo a Passo</h4>
        <Paragraph>
          Primeiro você passará pelo treino com 2 questões e em seguida para o experimento
          com 18 questões semelhantes ao treino, ok?
        </Paragraph>
      </div>

      <div className="flex flex-col space-y-1">
        <h4 className="text-lg font-bold">Atenção!</h4>
        <Paragraph>
        É muito importante que você não utilize nenhum recurso para mensurar a duração dos
        procedimentos, como contar, bater os pés, bater as mãos, etc. Ao término deste treino,
        será sinalizado o início do experimento e você iniciará clicando no botão “Continuar”.
        </Paragraph>
      </div>

      <div className="flex flex-row justify-center w-full space-x-2">
        <Button
          onClick={() => {
            go_to_previous_page();
          }}
          variant="text"
        >
          Voltar
        </Button>
        <Tooltip title="Por favor, leia as instruções antes de começar!">
          <Button
            onClick={() => {
              go_to_next_page();
            }}
            variant="contained"
            disabled={!isStartAvailable}
          >
            Começar!
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default Instructions;
