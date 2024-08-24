import React from "react";
import Title from "../../Global/Title";
import Paragraph from "../../Global/Paragraph";
import {
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

const Final = () => {
  const { userAnswers, setUserAnswers } = useAnswers();

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
                  relaxed_level: e.target.value as RelaxedScale,
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
                  salary: e.target.value as MinSalary,
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
                  have_enough_income: e.target.value as DichotomousAnswer,
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
                  have_answered_with_attention: e.target
                    .value as DichotomousAnswer,
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
                  have_something_disturbed_you: e.target
                    .value as DichotomousAnswer,
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
    </>
  );
};

export default Final;
