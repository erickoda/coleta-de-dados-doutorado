import Paragraph from "@/app/components/Global/Paragraph";
import Title from "@/app/components/Global/Title";
import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";
import React from "react";

const StartStimulus = () => {
  const { go_to_next_page } = usePages();

  return (
    <>
      <div className="flex flex-col">
        <Title>Antes de Iniciar, lembre-se:</Title>
        <Paragraph>
          <ul>
            <li>
              • Clique sobre o botão Iniciar da apresentação. <br />
            </li>

            <li>
              • Quando a opções de escolhas destacarem, clique na opção
              escolhida, após clique em botão Próximo. <br />
            </li>

            <li className=" text-red-300">
              • Caso você não responda a pergunta no tempo determinado, você
              voltará para está tela. <br />
            </li>
          </ul>
        </Paragraph>
      </div>

      <Button fullWidth variant="contained" onClick={() => go_to_next_page()}>
        Iniciar Apresentação do Estímulo
      </Button>
    </>
  );
};

export default StartStimulus;
