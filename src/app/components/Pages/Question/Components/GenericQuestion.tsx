import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { AnswerRole } from "@/app/types/questionAnswers";
import { QuestionAnswerI } from "@/app/types/questions";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

type GenericQuestionProps = {
  questionAnswer: QuestionAnswerI;
};

const GenericQuestion = ({ questionAnswer }: GenericQuestionProps) => {
  const { go_to_next_page, go_to_previous_page } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  const [isDisabled, setIsDisabled] = useState(true);
  const [timeoutExpired, setTimeoutExpired] = useState(false);
  const [isAbleToGoToNextPage, setIsAbleToGoToNextPage] = useState(false);

  const getAnswer = () => {
    const answer = userAnswers.questions_answers.find(
      (answer) => answer.question_id === questionAnswer.question.id
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
      <Title>{questionAnswer.questionTitle}</Title>
      <div className="flex flex-row space-x-2 w-full">
        <Button
          onClick={() =>
            setUserAnswers(questionAnswer.answerFirstQuestion(userAnswers))
          }
          fullWidth
          disabled={isDisabled}
          variant={
            userAnswers.questions_answers.find(
              (answer) => answer.question_id === questionAnswer.question.id
            )?.answer === questionAnswer.firstQuestionAnswer
              ? "contained"
              : "outlined"
          }
        >
          {questionAnswer.firstQuestionContent}
        </Button>

        <Button
          onClick={() =>
            setUserAnswers(questionAnswer.answerSecondQuestion(userAnswers))
          }
          fullWidth
          disabled={isDisabled}
          variant={
            userAnswers.questions_answers.find(
              (answer) => answer.question_id === questionAnswer.question.id
            )?.answer === questionAnswer.secondQuestionAnswer
              ? "contained"
              : "outlined"
          }
        >
          {questionAnswer.secondQuestionContent}
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
