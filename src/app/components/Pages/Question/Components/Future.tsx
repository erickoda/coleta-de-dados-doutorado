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
  const { go_to_next_page, go_to_previous_page } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  const [isDisabled, setIsDisabled] = useState(true);
  const [timeoutExpired, setTimeoutExpired] = useState(false);
  const [isAbleToGoToNextPage, setIsAbleToGoToNextPage] = useState(false);

  const getAnswer = () => {
    const answer = userAnswers.questions_answers.find(
      (answer) => answer.question_id === future_question.id
    )?.answer;

    return answer || AnswerRole.None;
  };

  useEffect(() => {
    const timeout_to_enable = setTimeout(() => setIsDisabled(false), 15000);
    const timeout_to_go_to_enable_next_page = setTimeout(() => {
      setTimeoutExpired(true);
    }, 20000);

    return () => {
      clearTimeout(timeout_to_enable);
      clearTimeout(timeout_to_go_to_enable_next_page);
    };
  }, []);

  useEffect(() => {
    if (!timeoutExpired) return;

    const answer = getAnswer();
    if (answer === AnswerRole.None && timeoutExpired) {
      go_to_previous_page();
    } else {
      setIsAbleToGoToNextPage(true);
    }
  }, [timeoutExpired]);

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
          variant={
            userAnswers.questions_answers.find(
              (answer) => answer.question_id === future_question.id
            )?.answer === AnswerRole.Immediate
              ? "contained"
              : "outlined"
          }
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
          variant={
            userAnswers.questions_answers.find(
              (answer) => answer.question_id === future_question.id
            )?.answer === AnswerRole.LongTerm
              ? "contained"
              : "outlined"
          }
        >
          {future_question.furthest.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}{" "}
          em {future_question.furthest.days} dias
        </Button>
      </div>
      <Button
        fullWidth
        disabled={!isAbleToGoToNextPage}
        variant="contained"
        onClick={() => go_to_next_page()}
      >
        Próximo
      </Button>
    </>
  );
};

export default Future;
