"use client";

import React from "react";
import Paragraph from "../../Global/Paragraph";
import Title from "../../Global/Title";
import { Gender } from "@/app/types/user";
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

const PersonalData = () => {
  const { go_to_next_page, go_to_previous_page } = usePages();

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
          <Select label="Gênero">
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
        />

        <TextField
          size="small"
          label="Profissão/Grau de Escolaridade/Curso"
          required
        />
        <TextField size="small" label="Instituição de Ensino" />

        <FormControl required className="col-span-2" size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Qual dispositivo está usando agora?
          </InputLabel>
          <Select label="Gênero">
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
          <Button onClick={() => go_to_next_page()} variant="outlined">
            Continuar
          </Button>
        </div>
      </div>
    </>
  );
};

export default PersonalData;
