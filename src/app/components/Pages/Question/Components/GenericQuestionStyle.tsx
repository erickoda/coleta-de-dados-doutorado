"use client";

import Title from '@/app/components/Global/Title';
import { usePages } from '@/app/context/pages';
import { Button } from '@mui/material';
import React, { FC } from 'react'

type GenericQuestionStylePropsT = {
  title: string;
  firstQuestionOnClick?: () => void;
  firstQuestionVariant?: "text" | "contained" | "outlined";
  firstQuestionContent: string;
  firstQuestionDisabled?: boolean;

  secondQuestionOnClick?: () => void;
  secondQuestionVariant?: "text" | "contained" | "outlined";
  secondQuestionContent: string;
  secondQuestionDisabled?: boolean;

  disabledNextButton: boolean;
};

const GenericQuestionStyle: FC<GenericQuestionStylePropsT> = ({
  title,

  firstQuestionOnClick,
  firstQuestionVariant = "outlined",
  firstQuestionContent,
  firstQuestionDisabled,

  secondQuestionOnClick,
  secondQuestionVariant = "outlined",
  secondQuestionContent,
  secondQuestionDisabled,

  disabledNextButton
}) => {
  const { go_to_next_page } = usePages();

  return (
    <>
      <Title>{title}</Title>
      <div className="flex flex-row space-x-2 w-full">
        <Button
          onClick={firstQuestionOnClick}
          fullWidth
          variant={firstQuestionVariant}
          disabled={firstQuestionDisabled}
        >
          {firstQuestionContent}
        </Button>

        <Button
          onClick={secondQuestionOnClick}
          fullWidth
          variant={secondQuestionVariant}
          disabled={secondQuestionDisabled}
        >
          {secondQuestionContent}
        </Button>
      </div>
      <Button
        fullWidth
        disabled={disabledNextButton}
        variant="contained"
        onClick={() => {
          go_to_next_page();
        }}
      >
        Próximo
      </Button>
    </>
  );
}

export default GenericQuestionStyle