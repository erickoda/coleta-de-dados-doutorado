"use client";

import React from "react";
import Paragraph from "../../Global/Paragraph";
import Title from "../../Global/Title";
import Gender from "@/app/types/user/gender";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Devices from "@/app/types/device";
import { usePages } from "@/app/context/pages";
import { useAnswers } from "@/app/context/answers";

const PersonalData = () => {
  const { go_to_next_page, go_to_previous_page } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  const isUsersAnswersValid = (): boolean => {
    if (userAnswers.personal_information.birth_date === null) {
      alert("Data de nascimento inválida");
      return false;
    }

    if (userAnswers.personal_information.device === "") {
      alert("Dispositivo inválido");
      return false;
    }

    if (userAnswers.personal_information.job_or_education_or_course === "") {
      alert("Profissão/Grau de Escolaridade/Curso inválido");
      return false;
    }

    if (!userAnswers.personal_information.gender) {
      alert("Gênero inválido");
      return false;
    }

    return true;
  };

  return (
    <>
      <article className="flex flex-col">
        <Title>Dados Pessoais</Title>
        <Paragraph size="small" className="text-justify">
          Para participar do estudo, precisamos de algumas informações suas. Por
          favor, preencha os campos abaixo.
        </Paragraph>
      </article>

      <div className="grid grid-cols-2 gap-4 w-full">
        <FormControl required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">Gênero</InputLabel>
          <Select
            value={Object.keys(Gender).find(
              (key) =>
                Gender[key as keyof typeof Gender] ===
                userAnswers.personal_information.gender
            )}
            label="Gênero"
            onChange={(e) => {
              setUserAnswers({
                ...userAnswers,
                personal_information: {
                  ...userAnswers.personal_information,
                  gender: Gender[e.target.value as keyof typeof Gender],
                },
              });
            }}
          >
            {Object.keys(Gender).map((key) => (
              <MenuItem key={key} value={key}>
                {Gender[key as keyof typeof Gender]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DatePicker
          slotProps={{
            textField: { size: "small", fullWidth: true, required: true },
          }}
          label="Data de Nascimento"
          value={userAnswers.personal_information.birth_date}
          onChange={(date) => {
            setUserAnswers({
              ...userAnswers,
              personal_information: {
                ...userAnswers.personal_information,
                birth_date: date,
              },
            });
          }}
        />

        <TextField
          size="small"
          label="Profissão/Grau de Escolaridade/Curso"
          required
          value={userAnswers.personal_information.job_or_education_or_course}
          onChange={(e) =>
            setUserAnswers({
              ...userAnswers,
              personal_information: {
                ...userAnswers.personal_information,
                job_or_education_or_course: e.target.value,
              },
            })
          }
        />
        <TextField
          size="small"
          label="Instituição de Ensino"
          value={userAnswers.personal_information.educational_institution}
          onChange={(e) =>
            setUserAnswers({
              ...userAnswers,
              personal_information: {
                ...userAnswers.personal_information,
                educational_institution: e.target.value,
              },
            })
          }
        />

        <FormControl required className="col-span-2" size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Qual dispositivo está usando agora?
          </InputLabel>
          <Select
            label="Gênero"
            value={Object.keys(Devices).find(
              (key) =>
                Devices[key as keyof typeof Devices] ===
                userAnswers.personal_information.device
            )}
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                personal_information: {
                  ...userAnswers.personal_information,
                  device: Devices[e.target.value as keyof typeof Devices],
                },
              })
            }
          >
            {Object.keys(Devices).map((key) => (
              <MenuItem key={key} value={key}>
                {Devices[key as keyof typeof Devices]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="col-span-2 flex flex-row justify-end items-center space-x-2">
          <Button
            onClick={() => {
              go_to_previous_page();
            }}
            variant="text"
          >
            Voltar
          </Button>
          <Button
            onClick={() => {
              if (!isUsersAnswersValid()) {
                return;
              }
              go_to_next_page();
            }}
            variant="outlined"
          >
            Continuar
          </Button>
        </div>
      </div>
    </>
  );
};

export default PersonalData;
