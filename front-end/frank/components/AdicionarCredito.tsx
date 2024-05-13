import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AddTokens, CreateUser } from "../src/api/login"
import { useState } from "react"

export const AddCredit = () => {

  const {
    register,
    handleSubmit,
  
  } = useForm()

  const [hasIcon, setHasIcon] = useState(false)

  const handleCreateUser: SubmitHandler<any> = async (data) => {
    const atualizaTokens = await AddTokens(data)
    if(atualizaTokens) {
      setHasIcon(true)
      setInterval(() => {
        setHasIcon(false)
      }, 2000)
    }
    
  }

  return (
   
    <Box bg='#353345' w={'40%'} p={10} borderRadius={'7px'}>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <Text fontWeight={'650'} mb={2} color={'#d3c22c'}>Adicionar credito</Text>
        <Flex   justify={'center'} flexDir={'column'} gap={2}>
          <Input color={'white'} type="number" border={'none'} bg={'#1d1c2d'} placeholder="Quantidade de credito" {...register("credit")}/>
          <Input  color={'white'} type="string" border={'none'} bg={'#1d1c2d'} placeholder="Nome do usuario" {...register("username")}/>
          <Button type="submit" bg='#F4E04D'>Cadastrar</Button>
        </Flex>
        {hasIcon &&
          <Text color={'green.500'}>Creditos Adicionados</Text>
        }
      </form>
    </Box>
    
  )
}