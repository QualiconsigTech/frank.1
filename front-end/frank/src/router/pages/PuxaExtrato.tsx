import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function GetExtract(){

  console.log(localStorage.getItem('token'))

  return (
    <Flex bg={'#0D2434'} h={'100vh'}>
      <Flex flexDir={'column'}>
        <Flex  w={'100vw'}  align={'center'}>
          <Image w={'20%'} h={'50%'} src={'../../../public/franklimpo.png'}/>
          <Text color={'white'} fontFamily={'poppins'} fontSize={20}>Frank puxa extrato</Text>
        </Flex>
        <Flex flexDir={'column'} bg={'#0D2434'} h={'100%'}  align={'center'}>
          <Box>
            <Input border={'none'} h={'50px'} fontSize={'20px'} color={'white'} fontFamily={'poppins'} bg={'#143a55'} type="text" placeholder="Numero Proposta"/>
          </Box>
          <Box mt={'20px'}>
            <Button bg={'#06c0e0'} _hover={{bg: '#0f8196'}} transition={'all ease 0.2s'}>Enviar</Button>
          </Box>

        </Flex>
      </Flex>
      
    </Flex>
  )
}