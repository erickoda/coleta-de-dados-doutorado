import React, { useEffect, useState } from "react";
import Title from "../../Global/Title";
import Paragraph from "../../Global/Paragraph";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import {
  DichotomousAnswer,
  MinSalary,
  OneToFive,
} from "@/app/types/user/final_questions";
import { useAnswers } from "@/app/context/answers";
import NumberInput from "../../Global/NumberInput";
import canBeConvertedToInteger from "@/app/types/user/canBeConvertedToInteger";
import axios from "axios";
import UserAnswers from "@/app/types/user/userAnswers";
import { ParsedAnswers } from "@/app/types/user/parsed_answer";
import Questions from "@/app/mock/questions";
import { usePages } from "@/app/context/pages";

const Final = () => {
  const { userAnswers, setUserAnswers } = useAnswers();
  const { go_to_next_page } = usePages();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);

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

  return (
    <>
      <div className="flex flex-col">
        <Title>Agradecemos muito sua participação!</Title>
        <Paragraph>
          Antes de terminar, pedimos que você responda 7 perguntas com
          informações pessoais, por favor. Esses dados servirão apenas para
          controle experimental e consulta, caso houver alguma dúvida na
          interpretação dos dados preliminares. Esta parte não é obrigatória.
        </Paragraph>
      </div>

      <div className="grid grid-cols-1 w-full gap-4">
        <FormControl required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            De 1 a 5 quanto você se sentiu calma ou relaxado?
          </InputLabel>
          <Select
            value={Object.keys(OneToFive).find(
              (key) =>
                OneToFive[key as keyof typeof OneToFive] ===
                userAnswers.final_questions.relaxed_level
            )}
            label="De 1 a 5 quanto você se sentiu calma ou relaxado?"
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  relaxed_level:
                    OneToFive[e.target.value as keyof typeof OneToFive],
                },
              })
            }
          >
            {Object.keys(OneToFive).map((key) => (
              <MenuItem key={key} value={key}>
                {OneToFive[key as keyof typeof OneToFive]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            De 1 a 5 quanto você se sentiu impulsivo?
          </InputLabel>
          <Select
            value={Object.keys(OneToFive).find(
              (key) =>
                OneToFive[key as keyof typeof OneToFive] ===
                userAnswers.final_questions.impulsivity
            )}
            label="De 1 a 5 quanto você se sentiu impulsivo?"
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  impulsivity:
                    OneToFive[e.target.value as keyof typeof OneToFive],
                },
              })
            }
          >
            {Object.keys(OneToFive).map((key) => (
              <MenuItem key={key} value={key}>
                {OneToFive[key as keyof typeof OneToFive]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            De 1 a 5 quanto você se sentiu autocontrolado?
          </InputLabel>
          <Select
            value={Object.keys(OneToFive).find(
              (key) =>
                OneToFive[key as keyof typeof OneToFive] ===
                userAnswers.final_questions.auto_control
            )}
            label="De 1 a 5 quanto você se sentiu autocontrolado?"
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  auto_control:
                    OneToFive[e.target.value as keyof typeof OneToFive],
                },
              })
            }
          >
            {Object.keys(OneToFive).map((key) => (
              <MenuItem key={key} value={key}>
                {OneToFive[key as keyof typeof OneToFive]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Qual sua renda individual mensal, aproximadamente?
          </InputLabel>
          <Select
            value={Object.keys(MinSalary).find(
              (key) =>
                MinSalary[key as keyof typeof MinSalary] ===
                userAnswers.final_questions.salary
            )}
            label="Qual o seu salário?"
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  salary: MinSalary[e.target.value as keyof typeof MinSalary],
                },
              })
            }
          >
            {Object.keys(MinSalary).map((key) => (
              <MenuItem key={key} value={key}>
                {MinSalary[key as keyof typeof MinSalary]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <NumberInput
          className=""
          value={userAnswers.final_questions.quantity_of_dependents ?? ""}
          onChange={(e) => {
            if (e.target.value === "") {
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  quantity_of_dependents: null,
                },
              });
              return;
            }

            if (
              !canBeConvertedToInteger(e.target.value) ||
              isNaN(Number(e.target.value))
            ) {
              return;
            }

            setUserAnswers({
              ...userAnswers,
              final_questions: {
                ...userAnswers.final_questions,
                quantity_of_dependents: Number(e.target.value),
              },
            });
          }}
          label="Quantas pessoas dependem dessa renda?"
        />
        <FormControl className="" required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            No momento atual você considera sua renda suficiente para sua
            sobrevivência?
          </InputLabel>
          <Select
            value={Object.keys(DichotomousAnswer).find(
              (key) =>
                DichotomousAnswer[key as keyof typeof DichotomousAnswer] ===
                userAnswers.final_questions.have_enough_income
            )}
            label="No momento atual você considera sua renda suficiente para sua sobrevivência?"
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  have_enough_income:
                    DichotomousAnswer[
                      e.target.value as keyof typeof DichotomousAnswer
                    ],
                },
              })
            }
          >
            {Object.keys(DichotomousAnswer).map((key) => (
              <MenuItem key={key} value={key}>
                {DichotomousAnswer[key as keyof typeof DichotomousAnswer]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="" required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Você respondeu o experimento com atenção?
          </InputLabel>
          <Select
            value={Object.keys(DichotomousAnswer).find(
              (key) =>
                DichotomousAnswer[key as keyof typeof DichotomousAnswer] ===
                userAnswers.final_questions.have_answered_with_attention
            )}
            label="Você respondeu o experimento com atenção?"
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  have_answered_with_attention:
                    DichotomousAnswer[
                      e.target.value as keyof typeof DichotomousAnswer
                    ],
                },
              })
            }
          >
            {Object.keys(DichotomousAnswer).map((key) => (
              <MenuItem key={key} value={key}>
                {DichotomousAnswer[key as keyof typeof DichotomousAnswer]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="" required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Alguma coisa chamou sua atenção ou atrapalhou durante o experimento?
          </InputLabel>
          <Select
            value={Object.keys(DichotomousAnswer).find(
              (key) =>
                DichotomousAnswer[key as keyof typeof DichotomousAnswer] ===
                userAnswers.final_questions.have_something_disturbed_you
            )}
            label="Alguma coisa chamou sua atenção ou atrapalhou durante o experimento?"
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  have_something_disturbed_you:
                    DichotomousAnswer[
                      e.target.value as keyof typeof DichotomousAnswer
                    ],
                },
              })
            }
          >
            {Object.keys(DichotomousAnswer).map((key) => (
              <MenuItem key={key} value={key}>
                {DichotomousAnswer[key as keyof typeof DichotomousAnswer]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className=" w-full">
          <InputLabel className="text-sm" id="aaa">
            Você gostaria de comentar algo?
          </InputLabel>
          <TextareaAutosize
            aria-labelledby="aaa"
            className="w-full p-1 bg-transparent border-neutral-500 border rounded-sm"
            onChange={(e) => {
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  something_to_add: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center w-full">
        <Button
          variant="contained"
          disabled={isSendingData}
          onClick={() => {
            setIsSendingData(true);

            const questions_answers = (() => {
              const questions_answers: ParsedAnswers[] = [];

              userAnswers.questions_answers.forEach((answer, index) => {
                const question = (() => {
                  for (const block of Questions) {
                    for (const question of block) {
                      if (question.question.id === answer.question_id) {
                        return question.question;
                      }
                    }
                  }
                })();

                if (index > 1) {
                  questions_answers.push({
                    ...answer,
                    question: `${question?.title} ${
                      question?.first.content
                    } ; ${question?.second.content} ${
                      question?.discount_rate
                        ? `- Taxa de Desconto ${question.discount_rate}`
                        : ""
                    }`,
                    answer: answer.answer,
                    discount_rate: question?.discount_rate
                      ? question.discount_rate.toString().replaceAll(".", ",")
                      : "",
                    guessedTimeInMilliseconds:
                      answer.guessedTimeInMilliseconds / 1000,
                    user_email: userAnswers.consent_statement.email,
                  });
                }
              });

              return questions_answers;
            })();

            const time_spent = (() => {
              const parsed_time_spent: { [key: string]: string } = {};
              for (let i = 0; i < userAnswers.time_spent.length; i++) {
                const block: string = `bloco_${i + 1}`;
                parsed_time_spent[block] = (
                  (userAnswers.time_spent[i].final -
                    userAnswers.time_spent[i].initial) /
                  1000
                )
                  .toString()
                  .replaceAll(".", ",");
              }
              return parsed_time_spent;
            })();

            const calibrations = (() => {
              const parsed_calibrations: { [key: string]: string } = {};
              userAnswers.calibrations.forEach((calibration, index) => {
                const calibration_block: string = `Calibragem ${calibration.correct}`; 
                parsed_calibrations[calibration_block] = (
                  calibration.guessed / 1000
                )
                  .toString()
                  .replaceAll(".", ",");
              });
              return parsed_calibrations;
            })();

            console.log({
              ...userAnswers,
              personal_information: {
                ...userAnswers.personal_information,
                birth_date:
                  userAnswers.personal_information.birth_date?.toISOString(),
              },
              questions_answers: questions_answers,
              time_spent: time_spent,
            });

            axios
              .post(`${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}`, {
                ...userAnswers,
                personal_information: {
                  ...userAnswers.personal_information,
                  birth_date:
                    userAnswers.personal_information.birth_date?.toISOString(),
                },
                questions_answers: questions_answers,
                time_spent: time_spent,
                calibrations,
              })
              .then(() => {
                go_to_next_page();
              })
              .catch(() => {
                setIsSendingData(false);
                alert("Erro ao enviar dados, tente novamente!");
              })
              .finally(() => setIsSendingData(false));
          }}
        >
          Finalizar!
        </Button>
      </div>
    </>
  );
};

export default Final;
