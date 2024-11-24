"use client";

import { useAnswers } from "@/app/context/answers";
import { usePages } from "@/app/context/pages";
import isEmailValid from "@/app/utils/isEmailValid";
import { Button, Checkbox, TextField } from "@mui/material";
import React from "react";
import Paragraph from "../../Global/Paragraph";

const ConsentStatement = () => {
  const { go_to_next_page } = usePages();
  const { userAnswers, setUserAnswers } = useAnswers();

  const isUserDataValid = () => {
    if (!isEmailValid(userAnswers.consent_statement.email)) {
      alert("Email Inválido");
      return false;
    }
    if (userAnswers.consent_statement.full_name === "") {
      alert("Nome Inválido");
      return false;
    }
    if (userAnswers.consent_statement.accepted === false) {
      alert("Termo de consentimento não aceito");
      return false;
    }
    return true;
  };

  return (
    <>
      <h3 className="font-bold text-2xl">
        Termo de Consentimento Livre e Esclarecido
      </h3>
      <article className="flex flex-col space-y-3 max-h-[30rem] overflow-scroll bg-neutral-300 p-4 rounded">
        <Paragraph>
          {`
            Você está sendo convidado a participar da pesquisa intitulada "Temporalidade e
            tomada de decisão: avaliação do efeito da percepção subjetiva de tempo nos processos de
            cooperação e de escolhas intertemporais.", conduzida
            pela doutoranda Gabriela Soares Tiburcio, sob a orientação do Prof. Dr. José Lino
            Oliveira Bueno do Departamento de Psicologia da FFCLRP da Universidade de São Paulo. Esta
            pesquisa é realizada com uso de software desenvolvido para o experimento.
            `}
        </Paragraph>
        <Paragraph>
          {`
            Este comunicado visa dar a você participante convidado uma explicação clara da natureza da
            pesquisa, assim como do seu papel como participante voluntário.
          `}
        </Paragraph>
        <Paragraph>
          {`   
            A pesquisa estuda as relações entre a tomada de decisão e alguns processos cognitivos.
            Sua participação tomará no máximo 15 minutos.
            `}
        </Paragraph>
        <Paragraph>
          {`
            Sua participação consiste:
              A) Em tomar decisões sob a ótica da economia comportamental
              B) Estar atento as escolhas apresentadas 
              C) Estimar quanto tempo durou cada apresentação, de acordo com sua percepção.
            `}
        </Paragraph>
        <Paragraph>
          {`
            Esta tarefa não apresenta nenhum risco previsível para você, exceto pelo fato de que algum
            estímulo pode parecer pouco familiar por alguns participantes. Os estímulos são breves e não
            se espera que lhe causem desconforto.
            `}
        </Paragraph>
        <Paragraph>
          {`
            A participação neste estudo é estritamente voluntária. A informação coletada durante o
            processo será guardada indefinidamente e só será empregada para propósitos de pesquisa.
            Suas respostas serão codificadas usando um número de identificação e os resultados serão
            divulgados de forma grupal evitando assim qualquer uso de nome de pessoa ou família e, por
            tanto, serão anônimas.
            `}
        </Paragraph>
        <Paragraph>
          {`
            Você pode interromper a sua participação em qualquer momento sem que isso acarrete algum
            tipo de penalidade. Se alguma das perguntas durante a sessão lhe incomodar, você tem o direito
            de não a responder. Desde já agradecemos sua participação.
            `}
        </Paragraph>
        <Paragraph>
          {`
            Esclarecemos que não terá nenhuma despesa financeira para a realização do estudo.
            Portanto, não está previsto reembolso financeiro de qualquer natureza. Este Termo de
            Consentimento poderá ser copiado e arquivado por você. Após o experimento uma cópia
            ficará arquivada pelos pesquisadores.
            `}
        </Paragraph>
        <Paragraph>
          {`
            Qualquer dúvida com relação à participação e aos procedimentos dessa pesquisa poderá ser
            esclarecida antes, durante e após a realização do estudo, tanto com a pesquisadora quanto com
            o professor que orienta este estudo, Prof. Dr. José Lino Oliveira Bueno. Para eventuais dúvidas
            sobre questões éticas do projeto, entrar em contato com o Comitê de Ética em Pesquisa da Faculdade
            de Filosofia, Ciências e Letras de Ribeirão Preto - USP, cujos dados para contato são: Avenida
            Bandeirantes, 3900 - Bloco 01, Sala 07 - 14040-901 - Ribeirão Preto - SP - Brasil. Fone: 
            (16) 3315-4811 / Fax: (16) 3633-2660 - Atendimento de 2ª a 6ª das 13h30 às 17h30.
            E-mail: coetp@listas.ffclrp.usp.br.
            `}
        </Paragraph>
      </article>

      <h3 className="font-bold text-2xl">
        Obrigado por sua atenção e colaboração!
      </h3>

      <div className="flex flex-row justify-center items-center space-x-1 text-sm">
        <Checkbox
          onClick={() =>
            setUserAnswers({
              ...userAnswers,
              consent_statement: {
                ...userAnswers.consent_statement,
                accepted: !userAnswers.consent_statement.accepted,
              },
            })
          }
          checked={userAnswers.consent_statement.accepted}
          className="m-0 p-0"
        />{" "}
        <label htmlFor="">
          {" "}
          Li e concordo com o termo de consentimento e aceito participar
        </label>
      </div>

      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 w-full">
        <TextField
          id="outlined-basic"
          fullWidth
          label="Email"
          size="small"
          // className="w-1/3"
          error={!isEmailValid(userAnswers.consent_statement.email)}
          required
          value={userAnswers.consent_statement.email}
          onChange={(e) => {
            setUserAnswers({
              ...userAnswers,
              consent_statement: {
                ...userAnswers.consent_statement,
                email: e.target.value,
              },
            });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Nome Completo"
          size="small"
          fullWidth
          // className="w-1/3"
          error={userAnswers.consent_statement.full_name === ""}
          required
          value={userAnswers.consent_statement.full_name}
          onChange={(e) => {
            setUserAnswers({
              ...userAnswers,
              consent_statement: {
                ...userAnswers.consent_statement,
                full_name: e.target.value,
              },
            });
          }}
        />
        <Button
          fullWidth
          onClick={() => {
            if (!isUserDataValid()) {
              return;
            }

            go_to_next_page();
          }}
          variant="contained"
          // className="w-1/3"
        >
          Continuar
        </Button>
      </div>

      <p className="font-normal text-xs">
        Os dados de email e nome não serão usados para identificação pessoal e
        serão mantidos em sigilo.
      </p>
    </>
  );
};

export default ConsentStatement;
