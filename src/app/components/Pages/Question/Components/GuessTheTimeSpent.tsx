import Title from "@/app/components/Global/Title";
import { usePages } from "@/app/context/pages";
import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

const GuessTheTimeSpent = () => {
  const { go_to_next_page } = usePages();

  const [step, setStep] = useState<"initial" | "guessing" | "end">("initial");
  const [initialTime, setInitialTime] = useState<DOMHighResTimeStamp>(0);
  const [guessedTime, setGuessedTime] = useState<DOMHighResTimeStamp>(0);

  useEffect(() => {
    if (step === "initial") {
      return;
    }

    if (step === "guessing") {
      setInitialTime(performance.now());
      return;
    }

    const timer = window.requestAnimationFrame(() => {
      setGuessedTime(performance.now() - initialTime);
    });

    return () => window.cancelAnimationFrame(timer);
  }, [step]);

  return (
    <>
      <Title>Tente Simular o Tempo da Última questão</Title>
      <div className="flex flex-row space-x-2">
        <Button
          onClick={() => setStep("guessing")}
          disabled={step !== "initial"}
          variant="outlined"
          fullWidth
        >
          Início
        </Button>
        <Button
          onClick={() => setStep("end")}
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
    </>
  );
};

export default GuessTheTimeSpent;
