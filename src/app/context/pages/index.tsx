"use client";

import { createContext, useContext, useEffect, useState } from "react";
import PageContext, { PagesProviderProps } from "./types";
import ConsentStatement from "@/app/components/Pages/ConsentStatement";
import PersonalData from "@/app/components/Pages/PersonalData";
import Instructions from "@/app/components/Pages/Instructions";
import Questions from "@/app/mock/questions";
import Question from "@/app/components/Pages/Question";
import Final from "@/app/components/Pages/Final";
import Greet from "@/app/components/Pages/Greet";
import MockedCalibrations from "@/app/mock/calibration";
import VideoTutorial from "@/app/components/Pages/VideoTutorial";

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

  const conclusion_percentage = (100 * actual_page_index) / pagesQueue.length - 1;

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
    if (pagesQueue.length > 4) return;

    const questions: JSX.Element[] = [];

    let quantity_of_questions = 0;
    for (const block of Questions) {
      for (const generic_question of block) {
        quantity_of_questions += 1;

        const question_numbers = [1, 2, 3, 12];

        if (question_numbers.includes(quantity_of_questions)) {
          questions.push(
            <Question.StartStimulus
              isNextPageATutorial={quantity_of_questions === 1 ? true : false}
              key={generic_question.question.id}
            />
          );
        }

        if (quantity_of_questions === 1) {
          questions.push(
            <VideoTutorial key={"Vídeo"} />
          );
          questions.push(
            <Question.Test key={"Test"} />,
          );
        }

        questions.push(
          <Question.GenericQuestion
            key={generic_question.question.id}
            question={generic_question.question}
          />
        );
        questions.push(
          <Question.GuessTheTimeSpent
            question={generic_question.question}
            key={generic_question.question.id}
          />
        );

        if (quantity_of_questions === 2) {
          questions.push(<Question.Start key={"start"} />);
        }
      }
    }

    const calibrations: JSX.Element[] = [];

    for (let calibration of MockedCalibrations) {
      calibrations.push(
        <Question.Calibration
          key={`Calibration ${calibration.correct}`}
          calibration={calibration}
        />
      )
    }

    setPagesQueue([
      ...pagesQueue,
      ...questions,
      ...calibrations,
      <Final key={"final"} />,
      <Greet key="greet" />,
    ]);
  }, []);

  return (
    <PagesContext.Provider
      value={{
        actual_page,
        conclusion_percentage,
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
