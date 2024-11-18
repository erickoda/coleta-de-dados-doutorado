"use client";

import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { QuestionI } from "@/app/types/question/generic_questions";
import playAudio from "@/app/utils/playAudio";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import GenericQuestionStyle from "./GenericQuestionStyle";

type GenericQuestionProps = {
  question: QuestionI;
};

const GenericQuestion = ({ question }: GenericQuestionProps) => {
  const { go_to_next_page, go_to_previous_page } =
    usePages();
  const { userAnswers, setUserAnswers } = useAnswers();
  const [ timeHasExpired, setTimeHasExpired ] = useState<boolean>(false);

  useEffect(() => {
    const timeout_to_max_time_to_answer = setTimeout(() =>
      timeHasExpired === false ? setTimeHasExpired(true) : null, 6_000
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
      <GenericQuestionStyle
        title={question.title}
        firstQuestionOnClick={() => setUserAnswers(question.first.getAnswer(userAnswers))}
        firstQuestionVariant={
          userAnswers.questions_answers.find(
            (answer) => answer.question_id === question.id
          )?.answer === question.first.answer
            ? "contained"
            : "outlined"
        }
        firstQuestionContent={question.first.content}
      
        secondQuestionOnClick={() => setUserAnswers(question.second.getAnswer(userAnswers))}
        secondQuestionVariant={
          userAnswers.questions_answers.find(
            (answer) => answer.question_id === question.id
          )?.answer === question.second.answer
            ? "contained"
            : "outlined"
        }
        secondQuestionContent={question.second.content}
      
        disabledNextButton={!timeHasExpired}
      />
    </>
  );
};

export default GenericQuestion;
