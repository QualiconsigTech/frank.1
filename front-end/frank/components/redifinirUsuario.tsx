import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DeleteUsery, Reset } from "../src/api/login";

export const ResetUser = () => {

  const {
    register,
    handleSubmit,
  } = useForm();
 

  const handleRemove: SubmitHandler<any > = async(data) => {
    await Reset(data)
    console.log(data)
  }

  return (
    <Box  p={10} borderRadius={'7px'}>
    <form onSubmit={handleSubmit(handleRemove)}>
    <Text fontWeight={'650'} mb={2} color={'#d3c22c'}>Redefinir Senha</Text>
    <Flex   justify={'center'} flexDir={'column'} gap={2}>
    <Input color={'white'} border={'none'} bg={'#1d1c2d'} placeholder={'Nome do usuario'} {...register("username")}/>
      <Input color={'white'} border={'none'} bg={'#1d1c2d'} placeholder={'Nova senha'} {...register("password")}/>
      <Button type='submit' bg='#F4E04D' >Redefinir</Button>
    </Flex>
    </form>
  </Box>
  )
}