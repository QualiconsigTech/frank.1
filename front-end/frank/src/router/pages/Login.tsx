import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { CiLogin } from "react-icons/ci";
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginMain } from "../../api/login";
import { useEffect, useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
 const [dataReceived, setDataReceived] = useState<any>()
 const navigate = useNavigate(); // Usando useNavigate para redirecionamento

 const onSubmit: SubmitHandler<any> = async (data) => {
  try {
    const response = await LoginMain(data);
    localStorage.setItem('token', response.data);
    console.log(localStorage.getItem('token'))  
    navigate('/puxaex')
    
  } catch (error) {
    console.error("Login failed:", error);
  }
};
  
   return (
    <Flex w={'100vw'} h={'100vh'} alignItems={'center'} bg={'gray.700'}>
      <Box w={'40%'} margin={'0 auto'} >
          <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={4} flexDir={'column'}>
          <Flex justify={'center'}>
            <Text fontWeight={'650'} color={'white'} fontSize={20}>Login</Text>
          </Flex>
          
          <Box>
            <Input fontWeight={'500'} fontFamily={'poppins'} bg={'gray.200'} border={'none'}  type="text" placeholder="Username" {...register('username')}/>
          </Box>
          <Box>
            <Input fontWeight={'500'} fontFamily={'poppins'}  bg={'gray.200'} border={'none'} type="password" placeholder="Senha" {...register("password")}/>
          </Box>
          <Box>
            <Button color={'white'} textAlign={'center'} border={'none'} bg={'purple.500'} _hover={{
              backgroundColor: 'purple.400'
            }} type="submit">
              <Text textAlign={'center'}>Logar</Text>
              <Icon textAlign={'center'} fontSize={20} as={CiLogin }/>
            </Button>
          </Box>
        </Flex>
          </form>

      </Box>
    </Flex>
  )
}