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
  const [ initialTime, _ ] = useState(performance.now());

  useEffect(() => {
    playAudio();
  }, []);

  return (
    <>
      <Title>{question.title}</Title>
      <div className="flex flex-row space-x-2 w-full">
        <Button
          onClick={() => setUserAnswers(question.first.getAnswer(userAnswers))}
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
        onClick={() => {
          playAudio(460);
          setUserAnswers({
            ...userAnswers,
            questions_answers: userAnswers.questions_answers.map((answer) => {
              if (answer.question_id === question.id) {
                return {
                  ...answer,
                  time: performance.now() - initialTime,
                };
              }
              return answer;
            }),
          });
          go_to_next_page();
        }}
      >
        Próximo
      </Button>
    </>
  );
};

export default GenericQuestion;
