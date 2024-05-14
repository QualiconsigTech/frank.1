import React from 'react'
import {Button } from "@chakra-ui/react"
import { bg } from 'date-fns/locale'
import { color } from 'framer-motion'
export const CustomButton = (props:any) => {



  return (
    <Button color='white' bg='black'  _hover={{
      background: "#fff",
      color: '#000'
    }}> Painel Administrador
    </Button>
  )
  
}