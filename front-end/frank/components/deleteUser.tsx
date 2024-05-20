import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DeleteUsery } from "../src/api/login";

export const DeleteUser = () => {

  const {
    register,
    handleSubmit,
  } = useForm();
 

  const handleRemove: SubmitHandler<any > = async(data) => {
    await DeleteUsery(data)
    console.log(data)
  }

  return (
    <Box  p={10} borderRadius={'7px'}>
    <form onSubmit={handleSubmit(handleRemove)}>
    <Text fontWeight={'650'} mb={2} color={'#d3c22c'}>Remoção de usuario</Text>
    <Flex   justify={'center'} flexDir={'column'} gap={2}>
      <Input color={'white'} border={'none'} bg={'#1d1c2d'} placeholder={'nome do usuario'} {...register("username")}/>
      <Button type='submit' bg='#F4E04D' >Remover</Button>
    </Flex>
    </form>
  </Box>
  )
}