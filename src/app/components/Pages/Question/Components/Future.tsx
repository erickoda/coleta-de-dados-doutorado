import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { AnswerRole } from "@/app/types/questionAnswers";
import { QuestionFuture } from "@/app/types/questions";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

type FutureProps = {
  future_question: QuestionFuture;
};

const Future = ({ future_question }: FutureProps) => {
  const { go_to_next_page } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const timeout_to_enable = setTimeout(() => setIsDisabled(false), 15000);
    const timeout_to_go_to_next_page = setTimeout(
      () => go_to_next_page(),
      20000
    );

    return () => {
      clearTimeout(timeout_to_enable);
      clearTimeout(timeout_to_go_to_next_page);
    };
  }, []);

  return (
    <>
      <Title>Marque a Opção que preferir</Title>
      <div className="flex flex-row space-x-2 w-full">
        <Button
          onClick={() =>
            setUserAnswers({
              ...userAnswers,
              questions_answers: userAnswers.questions_answers.map((answer) =>
                answer.question_id === future_question.id
                  ? {
                      ...answer,
                      answer: AnswerRole.Immediate,
                    }
                  : answer
              ),
            })
          }
          fullWidth
          disabled={isDisabled}
          variant="outlined"
        >
          {future_question.closest.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}{" "}
          {future_question.closest.days === 0
            ? "Hoje"
            : `em ${future_question.closest.days} dias`}{" "}
        </Button>

        <Button
          onClick={() =>
            setUserAnswers({
              ...userAnswers,
              questions_answers: userAnswers.questions_answers.map((answer) =>
                answer.question_id === future_question.id
                  ? {
                      ...answer,
                      answer: AnswerRole.LongTerm,
                    }
                  : answer
              ),
            })
          }
          fullWidth
          disabled={isDisabled}
          variant="outlined"
        >
          {future_question.furthest.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}{" "}
          em {future_question.furthest.days} dias
        </Button>
      </div>
    </>
  );
};

export default Future;
