import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { CreateUserComponent } from "../../../components/createUser";
import { UserModificated } from "../../../components/usermodificated";
import { DeleteUser } from "../../../components/deleteUser";
import { AddCredit } from "./../../../components/AdicionarCredito";
import { FindUsers } from "../../../components/findUsers";
import { creditoTotal } from "../../api/getinfoUser";
import { ResetUser } from "../../../components/redifinirUsuario";
import { useEffect, useState } from "react";
import { ResetUsername } from "../../../components/resetname";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export const AdmCreated = () => {
  const [dat, setdat] = useState();

  const getVl = async () => {
    const data = await creditoTotal;
    setdat(data);
  };

  useEffect(() => {
    getVl();
  }, []);

  return (
    <Flex
      fontFamily={"poppins"}
      bg={"#34495e"}
      w={"100%"}
      minH={"100vh"}
      direction="column"
      align="center"
      justify="center"
      gap={4}
      px={4} // Add padding on X-axis for responsiveness
    >
      <Box color={"white"}>{dat}</Box>

      <Flex align="center" gap={"10px"} w={"100%"}>
        <Link to={"/frank"}>
          <Flex
            borderRadius={"5px"}
            h={"50px"}
            w={"50px"}
            justifyItems={"center"}
            align={"center"}
            justify={"center"}
          >
            <Icon
              as={IoIosArrowBack}
              fontSize={"20px"}
              color={"purple.400"}
              textAlign={"center"}
              alignContent={"center"}
            />
          </Flex>
        </Link>
        <Button
          flex={1} // Make button take remaining space
          fontSize={"12px"}
          bg={"red.400"}
          _hover={{ background: "red.600" }}
        >
          <Link
            to={
              "http://216.245.202.234/infraprev/extratoJSON.php?servico=extrato&login=emillyjson&pass=salvador2024&nb=337&saldo"
            }
            target="_blank"
          >
            <Text color={"white"}>Verificar créditos</Text>
          </Link>
        </Button>
      </Flex>

      <Box w={"100%"} mt={4}> {/* Adjust margin top */}
        <Flex
          flexWrap="wrap"
          justify="center" // Center elements horizontally
          gap={4}
        >
          <Box minW={"300px"} maxW={"400px"} bg="#353345" p={4} borderRadius={"md"}>
            <CreateUserComponent />
          </Box>
          <Box minW={"300px"} maxW={"400px"} bg="#353345" p={4} borderRadius={"md"}>
            <UserModificated />
          </Box>
          <Box minW={"300px"} maxW={"400px"} bg="#353345" p={4} borderRadius={"md"}>
            <AddCredit />
          </Box>
          <Box minW={"300px"} maxW={"400px"} bg="#353345" p={4} borderRadius={"md"}>
            <DeleteUser />
          </Box>
          <Box minW={"300px"} maxW={"400px"} bg="#353345" p={4} borderRadius={"md"}>
            <FindUsers />
          </Box>
          <Box minW={"300px"} maxW={"400px"} bg="#353345" p={4} borderRadius={"md"}>
            <ResetUser />
          </Box>
          <Box minW={"300px"} maxW={"400px"} bg="#353345" p={4} borderRadius={"md"}>
            <ResetUsername />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
