"use client";

import { useAnswers } from "@/app/context/answers";
import { QuestionI } from "@/app/types/question/generic_questions";
import playAudio from "@/app/utils/playAudio";
import React, { useEffect, useState } from "react";
import GenericQuestionStyle from "./GenericQuestionStyle";
import { usePages } from "@/app/context/pages";

type GenericQuestionProps = {
  question: QuestionI;
};

const GenericQuestion = ({ question }: GenericQuestionProps) => {
  const { userAnswers, setUserAnswers } = useAnswers();
  const { go_to_previous_page } = usePages();
  const [ timeHasExpired, setTimeHasExpired ] = useState<boolean>(false);
  const isATutorialQuestion = [1, 2].includes(question.id); 
  
  
  useEffect(() => {
    playAudio();

    if (isATutorialQuestion) {
      const timeout_to_max_time_to_answer = setTimeout(() =>
        timeHasExpired === false ? setTimeHasExpired(true) : null, 10_000
      );

      return () => {
        clearTimeout(timeout_to_max_time_to_answer)
      };
    }

    const timeout_to_max_time_to_answer = setTimeout(() =>
      timeHasExpired === false ? setTimeHasExpired(true) : null, 6_000
    );


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

    if (!timeHasExpired) {
      playAudio();

      if (isATutorialQuestion) {
        const timeout_to_max_time_to_answer = setTimeout(() =>
          timeHasExpired === false ? setTimeHasExpired(true) : null, 10_000
        );

        return () => {
          clearTimeout(timeout_to_max_time_to_answer)
        };
      }

      const timeout_to_max_time_to_answer = setTimeout(() =>
        timeHasExpired === false ? setTimeHasExpired(true) : null, 6_000
      );


      return () => {
        clearTimeout(timeout_to_max_time_to_answer)
      };
    }

    if (timeHasExpired && !user_has_answered) {
      let isATutorialQuestion = [1, 2].includes(question.id); 
      if (!isATutorialQuestion) {
        alert("Você não respondeu a tempo, por favor, tente novamente.");
      } else {
        go_to_previous_page();
      }
      setTimeHasExpired(false);
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
