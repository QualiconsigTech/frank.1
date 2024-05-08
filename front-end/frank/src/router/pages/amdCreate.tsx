import { Box, Flex } from "@chakra-ui/react"
import {CreateUserComponent} from '../../../components/createUser'
import {UserModificated} from '../../../components/usermodificated'
import {DeleteUser} from '../../../components/deleteUser'
import { AddCredit } from './../../../components/AdicionarCredito';
export const AdmCreated = () => {




  return (
    <Flex fontFamily={'poppins'} bg={'#0F0C1E'} w={'100vw'} h={'100vh'} justify={'center'}>
      <Box w={'80%'}>
        <Flex gap={5}>
          <CreateUserComponent/>      
          <UserModificated/>
          <AddCredit/>
          <DeleteUser/>
        </Flex>
      </Box>
    </Flex>

  )
}