import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DeleteUsery, Reset, Resetuser } from "../src/api/login";

export const ResetUsername = () => {

  const {
    register,
    handleSubmit,
  } = useForm();
 

  const handleRemove: SubmitHandler<any > = async(data) => {
    await Resetuser(data)
    console.log(data)
  }

  return (
    <Box  bg='#353345' h={'100%'} w={'100%'} p={10} borderRadius={'7px'}>
    <form onSubmit={handleSubmit(handleRemove)}>
    <Text fontWeight={'650'} mb={2} color={'#d3c22c'}>Redefinir Nome de usuario</Text>
    <Flex   justify={'center'} flexDir={'column'} gap={2}>
    <Input color={'white'} border={'none'} bg={'#1d1c2d'} placeholder={'Nome do usuario'} {...register("username")}/>
      <Input color={'white'} border={'none'} bg={'#1d1c2d'} placeholder={'Novo nome de usuario'} {...register("newUsername")}/>
      <Button type='submit' bg='#F4E04D' >Redefinir</Button>
    </Flex>
    </form>
  </Box>
  )
}