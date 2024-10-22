import Paragraph from "@/app/components/Global/Paragraph";
import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";
import React, { useEffect } from "react";

const StartStimulus = () => {
  const { go_to_next_page, actual_page_index } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  useEffect(() => {
    const indexes_of_first_question_block: number[] = [];

    for (let i = 0; i < 2; i++) {
      indexes_of_first_question_block.push(11 + i * 9 * 3);
    }

    if (indexes_of_first_question_block.includes(actual_page_index)) {
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
        <Title>Antes de Iniciar, lembre-se:</Title>
        <Paragraph>
          <ul>
            <li>
              • Assim que você clicar em “INICIAR” irá escutar dois bipes:
              1 no inicio da apresentação da questão e 1 após sua resposta; <br />
            </li>

            <li>
              • Você escolherá uma opção que preferir entre duas opções; <br />
            </li>

            <li>
              • Clicando em “PROXIMO” você irá estimar o intervalo entre os 2 bipes, ou seja, o inicio da apresentação e após a resposta; <br />
            </li>

            <li>
              • Clicando em “CONTINUAR” você irá para a proxima escolha e assim sucessivamente; <br />
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
