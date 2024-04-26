import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { CiLogin } from "react-icons/ci";
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginMain } from "../../api/login";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit: SubmitHandler<any> = (data) => LoginMain(data)
  
  

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