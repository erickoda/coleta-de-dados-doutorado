import Paragraph from '@/app/components/Global/Paragraph'
import Title from '@/app/components/Global/Title'
import { useAnswers } from '@/app/context/answers'
import { usePages } from '@/app/context/pages'
import CalibrationT from '@/app/types/user/calibration'
import playAudio from '@/app/utils/playAudio'
import { Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

type CalibrationProps = {
  calibration: CalibrationT;
}

const Calibration = ({calibration}: CalibrationProps) => {

    const { go_to_next_page } = usePages();
    const { userAnswers, setUserAnswers } = useAnswers();
  
    const [step, setStep] = useState<"initial" | "guessing" | "end">("initial");
    const [initialTime, setInitialTime] = useState<DOMHighResTimeStamp>(0);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
      setUserAnswers({
        ...userAnswers,
        time_spent: userAnswers.time_spent.map((time, index) => {
          if (
            userAnswers.time_spent[userAnswers.time_spent.length - 1].final !== 0
          )
            return time;
  
          if (index === userAnswers.time_spent.length - 1) {
            return {
              initial: time.initial,
              final: performance.now(),
            };
          }
  
          return time;
        }),
      });
    }, []);
  
    useEffect(() => {
      if (step === "initial") {
        return;
      }
  
      if (step === "guessing") {
        setInitialTime(performance.now());
        return;
      }
  
      const timer = window.requestAnimationFrame(() => {
        setUserAnswers({
          ...userAnswers,
          calibrations: userAnswers.calibrations.map((user_calibration) =>
            user_calibration.correct === calibration.correct
              ? {
                  ...user_calibration,
                  guessed: performance.now() - initialTime
                }
              : user_calibration
          ),
        });
      });
  
      return () => window.cancelAnimationFrame(timer);
    }, [step]);

  return (
    <>
      <Title>Estimação Temporal</Title>
      <Paragraph>
        <b>Por favor, estime um intervalo de: {calibration.correct} segundo.</b><br/>

        • Quando estiver pronto(a), clique no botão “INÍCIO” e deixe {calibration.correct} segundo passar,
        rapidamente clique no botão “FIM”.
      </Paragraph>

      <div className="flex flex-row space-x-2 w-full">
        <Button
          onClick={() => {
            playAudio(audioRef);
            setStep("guessing")
          }}
          disabled={step !== "initial"}
          variant="outlined"
          fullWidth
        >
          Início
        </Button>
        <Button
          onClick={() => {
            playAudio(audioRef);
            setStep("end")
          }}
          disabled={step !== "guessing"}
          variant="outlined"
          fullWidth
        >
          Fim
        </Button>
      </div>
      <Button
        fullWidth
        disabled={step !== "end"}
        variant="contained"
        onClick={() => go_to_next_page()}
      >
        Continuar
      </Button>

      <audio ref={audioRef}>
        <source src="/A.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

    </>
  )
}

export default Calibration