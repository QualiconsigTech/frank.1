import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react"

import { SubmitHandler, useForm } from "react-hook-form"
import { CreateUser } from "../src/api/login"
import { useState } from "react"

export const CreateUserComponent = () => {

  const {
    register,
    handleSubmit,
  
  } = useForm()

  const [hasIcon, setHasIcon] = useState(false)

  const handleCreateUser: SubmitHandler<any> = async (data) => {
    const created = await CreateUser(data)
    if(created) {
      setHasIcon(true)
      setInterval(() => {
        setHasIcon(false)
      }, 2000)
    }
    
  }

  return (
   
    <Box p={10} borderRadius={'7px'}>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <Text fontWeight={'650'} mb={2} color={'#d3c22c'}>Registro de novo usuario</Text>
        <Flex   justify={'center'} flexDir={'column'} gap={2}>
          <Input color={'white'} border={'none'} bg={'#1d1c2d'} placeholder={'nome do usuario'} {...register('username')}/>
          <Input color={'white'} type="password" border={'none'} bg={'#1d1c2d'} placeholder="Digite a senha do usuario" {...register("password")}/>
          <Select color={'white'}  border={'none'} bg={'#1d1c2d'} placeholder="Selecione o cargo" {...register("office")}>
            <option style={{
              background: "#1d1c2d"
            }} value="3">Administrador</option>
            <option style={{
              background: "#1d1c2d"
            }} value="1">Back-office</option>
            <option style={{
              background: "#1d1c2d"
            }} value="2">Comercial</option>
          </Select>
          <Button type="submit" bg='#F4E04D'>Cadastrar</Button>
        
        </Flex>
        {hasIcon &&
          <Text color={'green.500'}>Usuario Criado</Text>
        }
      </form>
    </Box>
    
  )
}