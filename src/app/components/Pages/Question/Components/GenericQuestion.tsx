import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { GenericAnswerRole } from "@/app/types/question/generic_answers";
import { QuestionI } from "@/app/types/question/generic_questions";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

type GenericQuestionProps = {
  question: QuestionI;
};

const GenericQuestion = ({ question }: GenericQuestionProps) => {
  const { go_to_next_page, go_to_previous_page } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  const [isDisabled, setIsDisabled] = useState(true);
  const [timeoutExpired, setTimeoutExpired] = useState(false);
  const [isAbleToGoToNextPage, setIsAbleToGoToNextPage] = useState(false);

  const getAnswer = () => {
    const answer = userAnswers.questions_answers.find(
      (answer) => answer.question_id === question.id
    )?.answer;

    return answer || GenericAnswerRole.None;
  };

  useEffect(() => {
    const timeout_to_enable = setTimeout(() => setIsDisabled(false), 1);
    const timeout_to_go_to_enable_next_page = setTimeout(() => {
      setTimeoutExpired(true);
    }, 2000);

    return () => {
      clearTimeout(timeout_to_enable);
      clearTimeout(timeout_to_go_to_enable_next_page);
    };
  }, []);

  useEffect(() => {
    if (!timeoutExpired) return;

    const answer = getAnswer();
    if (answer === GenericAnswerRole.None && timeoutExpired) {
      go_to_previous_page();
    } else {
      setIsDisabled(true);
      setIsAbleToGoToNextPage(true);
    }
  }, [timeoutExpired]);

  return (
    <>
      <Title>{question.title}</Title>
      <div className="flex flex-row space-x-2 w-full">
        <Button
          onClick={() => setUserAnswers(question.first.getAnswer(userAnswers))}
          fullWidth
          disabled={isDisabled}
          variant={
            userAnswers.questions_answers.find(
              (answer) => answer.question_id === question.id
            )?.answer === question.first.answer
              ? "contained"
              : "outlined"
          }
        >
          {question.first.content}
        </Button>

        <Button
          onClick={() => setUserAnswers(question.second.getAnswer(userAnswers))}
          fullWidth
          disabled={isDisabled}
          variant={
            userAnswers.questions_answers.find(
              (answer) => answer.question_id === question.id
            )?.answer === question.second.answer
              ? "contained"
              : "outlined"
          }
        >
          {question.second.content}
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

export default GenericQuestion;
