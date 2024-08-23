import React from "react";
import Title from "../../Global/Title";
import Paragraph from "../../Global/Paragraph";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

enum RelaxedScale {
  _1 = "1",
  _2 = "2",
  _3 = "3",
  _4 = "4",
  _5 = "5",
}

const Final = () => {
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

      <div className="grid grid-cols-2">
        <FormControl required size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            De 1 a 5 quanto você se sentiu calma ou relaxado?
          </InputLabel>
          <Select
            // value={}
            label=""
            onChange={(e) => {}}
          >
            {Object.keys(RelaxedScale).map((key) => (
              <MenuItem key={key} value={key}>
                {RelaxedScale[key as keyof typeof RelaxedScale]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default Final;
