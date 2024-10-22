import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { GenericAnswerRole } from "@/app/types/question/generic_answers";
import { QuestionI } from "@/app/types/question/generic_questions";
import playAudio from "@/app/utils/playAudio";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

type GenericQuestionProps = {
  question: QuestionI;
};

const GenericQuestion = ({ question }: GenericQuestionProps) => {
  const { go_to_next_page } =
    usePages();
  const { userAnswers, setUserAnswers } = useAnswers();
  const [initialTime, setInitialTime ] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    setInitialTime(performance.now());
    playAudio();
  }, []);

  useEffect(() => {
    playAudio();
    setUserAnswers({
      ...userAnswers,
      questions_answers: userAnswers.questions_answers.map((answer) => {
        if (answer.question_id === question.id) {
          return {
            ...answer,
            guessedTimeInMilliseconds: performance.now() - initialTime,
          };
        }
        return answer;
      }),
    });
  }, [hasAnswered]);

  return (
    <>
      <Title>{question.title}</Title>
      <div className="flex flex-row space-x-2 w-full">
        <Button
          onClick={() => {
            setUserAnswers(question.first.getAnswer(userAnswers));
            setHasAnswered(true);
          }}
          fullWidth
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
        disabled={
          userAnswers.questions_answers.find(
            (answer) => answer.question_id === question.id
          )?.answer === GenericAnswerRole.None
        }
        variant="contained"
        onClick={() => go_to_next_page()}
      >
        Próximo
      </Button>
    </>
  );
};

export default GenericQuestion;
