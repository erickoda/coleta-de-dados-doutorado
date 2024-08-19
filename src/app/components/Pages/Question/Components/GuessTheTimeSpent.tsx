import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

type GuessTheTimeSpentProps = {
  question_id: number;
};

const GuessTheTimeSpent = ({ question_id }: GuessTheTimeSpentProps) => {
  const { go_to_next_page } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  const [step, setStep] = useState<"initial" | "guessing" | "end">("initial");
  const [initialTime, setInitialTime] = useState<DOMHighResTimeStamp>(0);
  const [guessedTime, setGuessedTime] = useState<DOMHighResTimeStamp>(0);

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
          answer.question_id === question_id
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
      <Title>Tente Simular o Tempo da Questão</Title>
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
