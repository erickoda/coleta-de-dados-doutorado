import React from "react";
import Title from "../../Global/Title";
import { useAnswers } from "@/app/context/answers";
import MockedQuestions from "@/app/mock/questions";
import Paragraph from "../../Global/Paragraph";
import { isQuestionFuture } from "@/app/utils/questions";

const Result = () => {
  const { userAnswers } = useAnswers();

  return (
    <>
      <Title>Resultados (Debug)</Title>

      {MockedQuestions.blocks.map((block) =>
        block.map((question) => {
          const user_answer = userAnswers.questions_answers.find(
            (answer) => answer.question_id === question.id
          );

          return (
            <div className="flex flex-col" key={question.id}>
              <h3 className="font-lg font-bold">
                {isQuestionFuture(question)
                  ? `${question.closest.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                ${
                  question.closest.days === 0
                    ? "Hoje"
                    : `em ${question.closest.days} dias`
                }`
                  : `
                  Um participante recebeu
                  ${question.other_person_received_value.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                  para dividir com você. Ele lhe ofereceu
                  ${question.other_person_offer.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  . Você recusa ou aceita a oferta?.
                  `}
              </h3>
              <Paragraph>
                <strong>Resposta do usuário:</strong>{" "}
                {user_answer?.answer ? user_answer?.answer : "Nenhuma resposta"}
              </Paragraph>

              <Paragraph>
                <strong>Tempo Estimado:</strong>{" "}
                {user_answer?.guessedTimeInMilliseconds
                  ? `${user_answer.guessedTimeInMilliseconds / 1000} s`
                  : "Tempo Não Estimado"}
              </Paragraph>
            </div>
          );
        })
      )}
    </>
  );
};

export default Result;
