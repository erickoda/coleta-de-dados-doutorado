import Paragraph from "@/app/components/Global/Paragraph";
import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";
import React, { useEffect } from "react";

/**
 *
 *  8 => Times Start
 *  .. 9*5 + 8 => Times End And Restart
 *  .. 9*5*2 + 8 => Times End And Restart
 *
 */

const StartStimulus = () => {
  const { go_to_next_page, actual_page_index } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  useEffect(() => {
    const indexes_of_first_block_question: number[] = [];

    for (let i = 0; i < 6; i++) {
      indexes_of_first_block_question.push(11 + i * 9 * 3);
    }

    if (indexes_of_first_block_question.includes(actual_page_index)) {
      setUserAnswers({
        ...userAnswers,
        time_spent: indexes_of_first_block_question.map(
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
              indexes_of_first_block_question[index + 1] === actual_page_index;
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
