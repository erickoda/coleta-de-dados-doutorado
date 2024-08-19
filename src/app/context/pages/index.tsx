"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import PageContext, { PagesProviderProps } from "./types";
import ConsentStatement from "@/app/components/Pages/ConsentStatement";
import PersonalData from "@/app/components/Pages/PersonalData";
import Instructions from "@/app/components/Pages/Instructions";
import MockedQuestions from "@/app/mock/questions";
import Question from "@/app/components/Pages/Question";
import { isQuestionFuture, isQuestionOtherPerson } from "@/app/utils/questions";
import Result from "@/app/components/Pages/Result";

const PagesContext = createContext<PageContext>({} as PageContext);

function PagesProvider({ children }: PagesProviderProps) {
  const [actual_page, set_actual_page] = useState<React.ReactNode>(
    <ConsentStatement />
  );

  const [actual_page_index, set_actual_page_index] = useState<number>(0);

  const [pagesQueue, setPagesQueue] = useState<JSX.Element[]>([
    <ConsentStatement key={"consent statement"} />,
    <PersonalData key={"persona data"} />,
    <Instructions key={"instructions"} />,
  ]);

  const go_to_next_page = () => {
    if (actual_page_index < pagesQueue.length - 1) {
      set_actual_page_index(actual_page_index + 1);
      set_actual_page(pagesQueue[actual_page_index + 1]);
    }
  };

  const go_to_previous_page = () => {
    if (actual_page_index > 0) {
      set_actual_page_index(actual_page_index - 1);
      set_actual_page(pagesQueue[actual_page_index - 1]);
    }
  };

  useEffect(() => {
    if (pagesQueue.length > 3) return;

    const questions: JSX.Element[] = [];

    for (const question of MockedQuestions) {
      if (isQuestionFuture(question)) {
        questions.push(<Question.StartStimulus key={question.id} />);
        questions.push(
          <Question.Future key={question.id} future_question={question} />
        );
        questions.push(
          <Question.GuessTheTimeSpent
            question_id={question.id}
            key={question.id}
          />
        );

        continue;
      }

      questions.push(<Question.StartStimulus key={question.id} />);
      questions.push(
        <Question.OtherPerson
          key={question.id}
          other_person_question={question}
        />
      );
      questions.push(
        <Question.GuessTheTimeSpent
          question_id={question.id}
          key={question.id}
        />
      );
    }

    questions.push(<Result key={"end"} />);

    setPagesQueue([...pagesQueue, ...questions]);
  }, []);

  return (
    <PagesContext.Provider
      value={{
        actual_page,
        actual_page_index,
        go_to_next_page,
        go_to_previous_page,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
}

function usePages() {
  const context = useContext(PagesContext);
  if (!context) {
    throw new Error("usePages must be used within a PagesProvider");
  }
  return context;
}

export { PagesProvider, usePages };
