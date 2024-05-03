import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react"

export const AdmCreated = () => {

  const handleRemove = () => {
  }


  return (
    <Flex fontFamily={'poppins'} bg={'#0F0C1E'} w={'100vw'} h={'100vh'} justify={'center'}>
      <Box w={'80%'}>
        <Flex gap={5}>
          <Box bg='#353345' w={'40%'} p={10} borderRadius={'7px'}>
            <Text fontWeight={'650'} mb={2} color={'#d3c22c'}>Registro de novo usuario</Text>
            <Flex   justify={'center'} flexDir={'column'} gap={2}>
              <Input color={'white'} border={'none'} bg={'#1d1c2d'} placeholder={'nome do usuario'}/>
              <Input color={'white'} type="password" border={'none'} bg={'#1d1c2d'} placeholder="Digite a senha do usuario"/>
              <Select color={'white'}  border={'none'} bg={'#1d1c2d'} placeholder="Selecione o cargo">
                <option style={{
                  background: "#1d1c2d"
                }} value="1">Administrador</option>
                <option style={{
                  background: "#1d1c2d"
                }} value="2">Back-office</option>
                <option style={{
                  background: "#1d1c2d"
                }} value="3">Comercial</option>
              </Select>
            </Flex>
          </Box>

          <Box  bg='#353345' w={'40%'} p={10} borderRadius={'7px'}>
            <Text fontWeight={'650'} mb={2} color={'#d3c22c'}>Remoção de usuario</Text>
            <Flex   justify={'center'} flexDir={'column'} gap={2}>
              <Input color={'white'} border={'none'} bg={'#1d1c2d'} placeholder={'nome do usuario'}/>
              <Button bg='#F4E04D' onClick={handleRemove}>Remover</Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>

  )
}