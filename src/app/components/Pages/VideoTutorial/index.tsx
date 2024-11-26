import React from 'react'
import Title from '../../Global/Title'
import Paragraph from '../../Global/Paragraph'
import { Button } from '@mui/material'
import { usePages } from '@/app/context/pages'

const VideoTutorial = () => {
  
  const { go_to_next_page } = usePages();
  
  return (
    <>
      <Title>Vídeo Tutorial</Title>

      <iframe
        src="https://youtube.com/embed/d5CADDbj6cY?cc_load_policy=1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className='lg:w-[35rem] lg:h-[20rem] md:w-[35rem] md:h-[20rem] w-fit'
      >
      </iframe>

      <Button variant="contained" className='w-full' onClick={() => go_to_next_page()} >Continuar</Button>
    </>
  )
}

export default VideoTutorial