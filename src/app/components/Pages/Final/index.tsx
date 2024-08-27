import React, { useEffect } from "react";
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
  RelaxedScale,
} from "@/app/types/user/final_questions";
import { useAnswers } from "@/app/context/answers";
import NumberInput from "../../Global/NumberInput";
import canBeConvertedToInteger from "@/app/types/user/canBeConvertedToInteger";
import axios from "axios";

const Final = () => {
  const { userAnswers, setUserAnswers } = useAnswers();

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

  console.log("userAnswers");
  console.log(userAnswers);

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

      <div className="grid grid-cols-2 w-full gap-4">
        <FormControl required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            De 1 a 5 quanto você se sentiu calma ou relaxado?
          </InputLabel>
          <Select
            value={Object.keys(RelaxedScale).find(
              (key) =>
                RelaxedScale[key as keyof typeof RelaxedScale] ===
                userAnswers.final_questions.relaxed_level
            )}
            label="De 1 a 5 quanto você se sentiu calma ou relaxado?"
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                final_questions: {
                  ...userAnswers.final_questions,
                  relaxed_level:
                    RelaxedScale[e.target.value as keyof typeof RelaxedScale],
                },
              })
            }
          >
            {Object.keys(RelaxedScale).map((key) => (
              <MenuItem key={key} value={key}>
                {RelaxedScale[key as keyof typeof RelaxedScale]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Qual o seu salário?
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
          className="col-span-2"
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
        <FormControl className=" col-span-2" required size="small" fullWidth>
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
        <FormControl className="col-span-2" required size="small" fullWidth>
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

        <FormControl className="col-span-2" required size="small" fullWidth>
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

        <div className="col-span-2 w-full">
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
          onClick={() => {
            axios.post(`${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}`, {
              ...userAnswers,
              personal_information: {
                ...userAnswers.personal_information,
                birth_date:
                  userAnswers.personal_information.birth_date?.toISOString(),
              },
              questions_answers: userAnswers.questions_answers.map(
                (question) => ({
                  ...question,
                  user_email: userAnswers.consent_statement.email,
                })
              ),
              time_spent: userAnswers.time_spent.map((time, index) => {
                const bloco = `bloco_${index + 1}`;
                return {
                  [bloco]: time.final - time.initial,
                };
              }),
            });
          }}
        >
          Finalizar!
        </Button>
      </div>
    </>
  );
};

export default Final;
