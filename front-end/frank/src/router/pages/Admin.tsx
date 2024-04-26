import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { CiMenuBurger } from "react-icons/ci"

const AdminPage = () => {


  return (
    <Flex w={'100vw'}  h={'100vh'}  bg={"#ecf0f1"}>
      <Flex mt={'14px'} ml={'20px'} >
        <Flex cursor={'pointer'}  justifyContent={'center'} w={'60px'} h={'30px'} align={'center'} borderRadius={'full'} bg={'#7c7c80'} justifyItems={'flex-end'}>
          <Icon textAlign={'end'} fontSize={'20px'}  as={CiMenuBurger}/>
        </Flex>
      </Flex>
      <Flex w={'80%'} justify={'center'} margin={'0 auto'} align={'center'}>
        
        <Flex gap={4}>
          <Box borderRadius={'10px'} w={'40vw'} h={'70vh'} bgColor={'#95a5a6'}>
            <Text fontWeight={'650'} mt={4} fontFamily={'poppins'} textAlign={'center'}>Comercial</Text>
            <Box></Box>
          </Box>
          <Box borderRadius={'10px'}  w={'40vw' } h={'70vh'} bgColor={'#95a5a6'}>
            <Text fontWeight={'650'} fontFamily={'poppins'} textAlign={'center'} mt={4}>Back-Office</Text>
            <Flex fontFamily={'poppins'} flexDir={'column'} gap={2} ml={'20px'} mt={5}>
              <Box>
                <Text>Totais | </Text>
              </Box>
              <Box>
                <Text>Gastos |</Text>
              </Box>
              <Box>
                <Text>Restantes |</Text>
              </Box>
              <Box>
                <Text></Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
  
}

export default AdminPage