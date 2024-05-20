import { Box, Button, Flex, Input, Select, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FindUser } from "../src/api/getinfoUser";
import { useState } from "react";

export const FindUsers = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const [hasIcon, setHasIcon] = useState(false);
  const [response, setResponse] = useState([]);

  const handleCreateUser: SubmitHandler<any> = async (data) => {
    const created = await FindUser(data);
    if (created) {
      setHasIcon(true);
      setResponse(created);
    }
  };

  return (
    <Box  p={10} borderRadius={"7px"} overflowY="auto" maxHeight="400px" h={'auto'}>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <Text fontWeight={650} mb={2} color={"#d3c22c"}>
          Buscas usuarios
        </Text>
        <Flex justify={"center"} flexDir={"column"} gap={2}>
          <Select color={"white"} border={"none"} bg={"#1d1c2d"} placeholder="Selecione o cargo" {...register("office")}>
            <option style={{ background: "#1d1c2d" }} value="3">
              Administrador
            </option>
            <option style={{ background: "#1d1c2d" }} value="1">
              Back-office
            </option>
            <option style={{ background: "#1d1c2d" }} value="2">
              Comercial
            </option>
          </Select>
          <Button type="submit" bg="#F4E04D">
            Buscar
          </Button>
        </Flex>
        {hasIcon && (
          <Box mt={2}>
            <Box>
              <Table>
                <Thead bg={"white"}>
                  <Th>Nomes</Th>
                  <Th>Creditos</Th>
                </Thead>
                <Tbody color={"white"}>
                  {response.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.username}</Td>
                      <Td>{item.token}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        )}
      </form>
    </Box>
  );
};
