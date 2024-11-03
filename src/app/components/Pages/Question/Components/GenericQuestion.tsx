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
  const { go_to_next_page, go_to_previous_page } =
    usePages();
  const { userAnswers, setUserAnswers } = useAnswers();
  const [ timeHasExpired, setTimeHasExpired ] = useState<boolean>(false);

  useEffect(() => {

    console.log("dasfa");

    const timeout_to_max_time_to_answer = setTimeout(() =>
      timeHasExpired === false ? setTimeHasExpired(true) : null, 7_000
    );
    playAudio();

    return () => {
      clearTimeout(timeout_to_max_time_to_answer)
    };
  },[]);

  useEffect(() => {

    const user_has_answered = userAnswers.questions_answers.find(
        (answer) => answer.question_id === question.id
      )?.answer === question.first.answer || userAnswers.questions_answers.find(
        (answer) => answer.question_id === question.id
      )?.answer === question.second.answer;

    if (timeHasExpired && !user_has_answered) {
      go_to_previous_page();
      alert("Você não respondeu a tempo, por favor, tente novamente.");
      return;
    }

    playAudio();
  }, [timeHasExpired]);

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
        disabled={!timeHasExpired}
        variant="contained"
        onClick={() => {
          go_to_next_page();
        }}
      >
        Próximo
      </Button>
    </>
  );
};

export default GenericQuestion;
