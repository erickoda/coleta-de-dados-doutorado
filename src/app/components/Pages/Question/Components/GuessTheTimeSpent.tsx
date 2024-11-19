import Paragraph from "@/app/components/Global/Paragraph";
import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { QuestionI } from "@/app/types/question/generic_questions";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import GenericQuestionStyle from "./GenericQuestionStyle";

type GuessTheTimeSpentProps = {
  question: QuestionI;
};

const GuessTheTimeSpent = ({ question }: GuessTheTimeSpentProps) => {
  const { go_to_next_page } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  const [step, setStep] = useState<"initial" | "guessing" | "end">("initial");
  const [initialTime, setInitialTime] = useState<DOMHighResTimeStamp>(0);

  useEffect(() => {
    if (step === "initial") {
      return;
    }

    if (step === "guessing") {
      setInitialTime(performance.now());
      return;
    }

    const timer = window.requestAnimationFrame(() => {
      setUserAnswers({
        ...userAnswers,
        questions_answers: userAnswers.questions_answers.map((answer) =>
          answer.question_id === question.id
            ? {
                ...answer,
                guessedTimeInMilliseconds: performance.now() - initialTime,
              }
            : answer
        ),
      });
    });

    return () => window.cancelAnimationFrame(timer);
  }, [step]);

  return (
    <>
      <div className="flex flex-col">
        <Title>Por favor, estime a duração</Title>
        <Paragraph>
          <ul>
            <li>
              • Quando estiver pronto(a), clique no botão “INÍCIO” e deixe o tempo da tarefa passar. <br />
            </li>

            <li>
              • Assim que julgar o tempo passado igual ao da tarefa anterior, aperte a tecla “FIM” <br />
            </li>

            <li>
              •
              <b>
                Lembre-se: é muito importante que você não utilize nenhum recurso
                para mensurar a duração dos procedimentos, como contar, bater os pés,
                bater as mãos, etc.
              </b>
            </li>
          </ul>
        </Paragraph>
      </div>

      <div className="flex flex-col w-full items-center space-y-3 p-4 border rounded-md">
        <Title>Relembrando Último Questão...</Title>
        <GenericQuestionStyle
          title={question.title}
          firstQuestionContent={question.first.content}
          firstQuestionDisabled={true}
          secondQuestionContent={question.second.content}
          secondQuestionDisabled={true}
        
          disabledNextButton={true}
        />
      </div>

      <div className="flex flex-row space-x-2 w-full">
        <Button
          onClick={() => setStep("guessing")}
          disabled={step !== "initial"}
          variant="outlined"
          fullWidth
        >
          Início
        </Button>
        <Button
          onClick={() => setStep("end")}
          disabled={step !== "guessing"}
          variant="outlined"
          fullWidth
        >
          Fim
        </Button>
      </div>
      <Button
        fullWidth
        disabled={step !== "end"}
        variant="contained"
        onClick={() => go_to_next_page()}
      >
        Continuar
      </Button>
    </>
  );
};

export default GuessTheTimeSpent;
