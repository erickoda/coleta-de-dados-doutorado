"use client";

import { createContext, useContext, useEffect, useState } from "react";
import PageContext, { PagesProviderProps } from "./types";
import ConsentStatement from "@/app/components/Pages/ConsentStatement";
import PersonalData from "@/app/components/Pages/PersonalData";
import Instructions from "@/app/components/Pages/Instructions";
import MockedQuestions from "@/app/mock/questions";
import Question from "@/app/components/Pages/Question";
import { isQuestionFuture, isQuestionOtherPerson } from "@/app/utils/questions";

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
    MockedQuestions.forEach((question, index) => {
      if (isQuestionFuture(question)) {
        setPagesQueue([
          ...pagesQueue,
          <Question.StartStimulus key={`${index} - ${question.id}`} />,
          <Question.Future
            key={`${index} - ${question.id}`}
            future_question={question}
          />,
          <Question.GuessTheTimeSpent key={`${index} - ${question.id}`} />,
        ]);
      }

      if (isQuestionOtherPerson(question)) {
        setPagesQueue([
          ...pagesQueue,
          <Question.StartStimulus key={`${index} - ${question.id}`} />,
          <Question.OtherPerson
            key={`${index} - ${question.id}`}
            other_person_question={question}
          />,
          <Question.GuessTheTimeSpent key={`${index} - ${question.id}`} />,
        ]);
      }
    });
  }, []);

  return (
    <PagesContext.Provider
      value={{
        actual_page,
        set_actual_page,
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
