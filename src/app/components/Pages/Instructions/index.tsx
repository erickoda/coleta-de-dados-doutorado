import React from "react";
import Title from "../../Global/Title";
import Paragraph from "../../Global/Paragraph";

const Instructions = () => {
  return (
    <>
      <div className="flex flex-col space-y-1">
        <Title>Instruções</Title>
        <Paragraph>
          Por favor, durante o experimento procure permanecer sentado(a) numa
          posição cômoda e relaxada, sem distrações.
          <b> Lembre-se: sua participação é muito importante para nós.</b>
        </Paragraph>
      </div>

      <div className="flex flex-col space-y-1">
        <h4 className="text-lg font-bold">Passo a Passo</h4>
        <Paragraph>
          <ul>
            <li>
              • Clique sobre o botão Iniciar da apresentação. <br />
            </li>

            <li>
              • Quando a opções de escolhas destacarem, clique na opção
              escolhida, após clique em botão Próximo. <br />
            </li>

            <li>
              • Em seguida você irá reproduzir a duração total da apresentação e
              escolha, que você acabou de fazer. <br />
            </li>

            <li>
              • Para isso você deve apertar a tecla INÍCIO e deixar o tempo
              passar. <br />
            </li>

            <li>
              • Quando você achar que o tempo que está passando for igual ao do
              estímulo apresentado, aperte a tecla FIM. <br />
            </li>
          </ul>
        </Paragraph>
      </div>

      <div className="flex flex-col space-y-1">
        <h4 className="text-lg font-bold">Atenção!</h4>
        <Paragraph>
          É muito importante que você não utilize nenhum recurso para contar a
          duração do estímulo, como contar, bater os pés, bater as mãos etc.
          Isso pode interferir nos resultados do estudo. Ao término deste
          treino, você deverá clicar em Próximo.
        </Paragraph>
      </div>
    </>
  );
};

export default Instructions;
