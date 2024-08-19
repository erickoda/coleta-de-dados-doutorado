import Title from "@/app/components/Global/Title";
import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import { AnswerRole } from "@/app/types/questionAnswers";
import { QuestionOtherPerson } from "@/app/types/questions";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

type OtherPersonProps = {
  other_person_question: QuestionOtherPerson;
};

const OtherPerson = ({ other_person_question }: OtherPersonProps) => {
  const { go_to_next_page } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const timeout_to_enable = setTimeout(() => setIsDisabled(false), 15000);
    const timeout_to_go_to_next_page = setTimeout(
      () => go_to_next_page(),
      20000
    );

    return () => {
      clearTimeout(timeout_to_enable);
      clearTimeout(timeout_to_go_to_next_page);
    };
  }, []);

  return (
    <>
      <Title>
        Um participante recebeu{" "}
        {other_person_question.other_person_received_value.toLocaleString(
          "pt-BR",
          { style: "currency", currency: "BRL" }
        )}{" "}
        para dividir com você. Ele lhe ofereceu{" "}
        {other_person_question.other_person_offer.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        . Você recusa ou aceita a oferta?.
      </Title>

      <div className="flex flex-row space-x-2 w-full">
        <Button
          onClick={() =>
            setUserAnswers({
              ...userAnswers,
              questions_answers: userAnswers.questions_answers.map((answer) =>
                answer.question_id === other_person_question.id
                  ? { ...answer, answer: AnswerRole.Reject }
                  : answer
              ),
            })
          }
          fullWidth
          disabled={isDisabled}
          variant={
            userAnswers.questions_answers.find(
              (answer) => answer.question_id === other_person_question.id
            )?.answer === AnswerRole.Reject
              ? "contained"
              : "outlined"
          }
        >
          Recusar
        </Button>

        <Button
          onClick={() =>
            setUserAnswers({
              ...userAnswers,
              questions_answers: userAnswers.questions_answers.map((answer) =>
                answer.question_id === other_person_question.id
                  ? { ...answer, answer: AnswerRole.Accept }
                  : answer
              ),
            })
          }
          fullWidth
          disabled={isDisabled}
          variant={
            userAnswers.questions_answers.find(
              (answer) => answer.question_id === other_person_question.id
            )?.answer === AnswerRole.Accept
              ? "contained"
              : "outlined"
          }
        >
          Aceitar
        </Button>
      </div>
    </>
  );
};

export default OtherPerson;
