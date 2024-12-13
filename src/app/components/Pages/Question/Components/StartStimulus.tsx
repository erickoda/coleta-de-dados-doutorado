import Paragraph from "@/app/components/Global/Paragraph";
import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";
import React, { useEffect } from "react";

type StartStimulusProps = { isNextPageATutorial?: boolean };

const StartStimulus = ({isNextPageATutorial}: StartStimulusProps) => {
  const { go_to_next_page, actual_page_index } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  useEffect(() => {
    const indexes_of_first_question_block: number[] = [];

    for (let i = 0; i < 2; i++) {
      indexes_of_first_question_block.push(12 + (i * 9 * 2 + (i === 0 ? 0 : 1)));
    }

    if (indexes_of_first_question_block.includes(actual_page_index)) {

      if (!userAnswers.date_when_starts_first_question) {
        userAnswers.date_when_starts_first_question = new Date();
      }

      setUserAnswers({
        ...userAnswers,
        time_spent: indexes_of_first_question_block.map(
          (question_index, index) => {
            const isTimeAlreadyCalculated =
              userAnswers.time_spent[index].final !== 0;
            if (isTimeAlreadyCalculated) {
              return userAnswers.time_spent[index];
            }

            const isRunningTimeForThisBlock =
              question_index === actual_page_index &&
              userAnswers.time_spent[index].initial !== 0;
            if (isRunningTimeForThisBlock) {
              return userAnswers.time_spent[index];
            }

            const isLastCalculatedBlock =
              indexes_of_first_question_block[index + 1] === actual_page_index;
            if (isLastCalculatedBlock) {
              return {
                initial: userAnswers.time_spent[index].initial,
                final: performance.now(),
              };
            }

            const is_actual_block = question_index === actual_page_index;
            if (is_actual_block) {
              return {
                initial: performance.now(),
                final: 0,
              };
            }

            return userAnswers.time_spent[index];
          }
        ),
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <Title>Instruções:</Title>
        <Paragraph>
          <ul className="flex flex-col space-y-2">
            <li>
              1 - Assim que você clicar em “INICIAR” irá ouvir o primeiro bipe para iniciar a tarefa. A tarefa é escolher entre as duas opções apresentadas. 
              <br />
            </li>

            <li>
              2- Após a escolha você ouvirá o segundo bipe, sinalizando o fim da tarefa.
              <br />
            </li>

            <li>
              3 - Clicando em “PRÓXIMO” você irá estimar a duração da tarefa, ou seja, a duração entre os dois bipes.
              <br />
            </li>

            <li>
              4 - Clicando em “CONTINUAR” você irá para a próxima escolha e assim sucessivamente;
              <br />

              <div className="flex flex-col pl-4 space-y-1">
                <ul>
                  <li>
                    • Caso você não escolha no tempo determinado, a pergunta se repetirá.<br />
                  </li>

                  <li>
                    • Por favor, durante o experimento utilize um fone de ouvido e mantenha o
                    volume em uma altura confortavel, procure permanecer sentado(a) numa posição
                    cômoda e relaxada, sem distrações. <b>Lembre-se: sua participação é muito importante para nós</b>.
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </Paragraph>
      </div>

      <Button fullWidth variant="contained" onClick={() => go_to_next_page()}>
        {isNextPageATutorial ? "Iniciar Tutorial" : "Iniciar Apresentação do Estímulo"}
      </Button>
    </>
  );
};

export default StartStimulus;
