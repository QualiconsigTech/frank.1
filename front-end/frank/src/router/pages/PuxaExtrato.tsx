import { Box, Button, Flex, Icon, Image, Input, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getInfoCredits } from "../../api/login";
import { Extract, ExtractFiveDays, GetTotalTokens } from "../../api/consultas/index";
import { useEffect, useState } from "react";
import PDFGenerator from "../../../components/pdfGenerator";
import { HiOfficeBuilding } from "react-icons/hi";
import { RiCoinsFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Loading } from "../../../components/load/loading";
import { SearchButton } from "../../../components/buttons/searchButton";
import { Link, redirect, useNavigate } from "react-router-dom";
import { CustomButton } from "../../comp/buttons";
import PuxaFrank from '../../../public/FrankPuxa.gif'
import { CiLogout } from "react-icons/ci";

export default function GetExtract() {

  const navigate = useNavigate(); // Usando useNavigate para redirecionamento

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }


  const { register, handleSubmit } = useForm();
  const [formDataIsSubmited, setFormDataSubmited] = useState(false);
  const [receivedApiResponse, setReceivedApiResponse] = useState<any>();
  const [receivedCredits, setReceivedCredits] = useState<any>();
  const [username, setUsername] = useState<any>();
  const [office, setOffice] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [credits, setCredits] = useState<any>();

  const receivedToken = () => {
    const username = localStorage.getItem("username");
    const office = localStorage.getItem("office");
    const credits = localStorage.getItem("credits");

    setReceivedCredits(credits);
    setOffice(office);
    setUsername(username);
    console.log(username, office);
  };

  useEffect(() => {
    const getInformationForOffice = async () => {
      const creditInformation = await GetTotalTokens(username);
      console.log(creditInformation);
      setCredits(creditInformation);
    };
    getInformationForOffice();
  }, [receivedCredits]);

  const onSubmitComercial: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    if (office === "1") {
      const response = await Extract(data, username)
      setReceivedApiResponse(response);
      setFormDataSubmited(true)
    } else if (office == "2") {
      const newData = await data.numeroRegistro;
      const response = await ExtractFiveDays(newData, username);
      setReceivedApiResponse(response);
      setInterval(() => {
        if (response) {
          setFormDataSubmited(true);
          const getInformationForOffice = async () => {
            const creditInformation = await GetTotalTokens(username);
            setCredits(creditInformation);
          };
          getInformationForOffice();
          
        }
      }, 2000);
    } else if (office === "3") {
      const response = await Extract(data,username);
      setReceivedApiResponse(response)
      setFormDataSubmited(true)
      console.log(response)
    }
  };

  useEffect(() => {
    receivedToken();
  });
  return (
    <>
      <Flex bg={"#0D2434"} h={"100vh"}>
        <Flex flexDir={"column"} mt='20px'>
          <form onSubmit={handleSubmit(onSubmitComercial)}>
            <Flex h={"10vh"} justify={"center"} w={"100vw"}>
              <Flex
                w={"90%"}
                mt={"50px"}
                align={"center"}
                justify={"space-between"}
              >
                <Flex w={"50%"} align={"center"}>
                  <Image
                    mt="20px"
                    ml={"20px"}
                    w={"10%"}
                    h={"100%"}
                    src={PuxaFrank}
                  />
                  <Text color={"white"} fontFamily={"poppins"} fontSize={20}>
                    Frank puxa extrato
                  </Text>
                </Flex>
                <Box>
                  <Text color={"white"} fontSize={"12px"} fontFamily={"Roboto"}>
                    <Flex gap={1} align={"center"} fontSize={"20px"}>
                      {" "}
                      <Icon fontSize={"15px"} as={FaUser} /> {username}
                    </Flex>
                    <Flex
                      mt={"2"}
                      align={"center"}
                      gap={1}
                      color={"yellow"}
                      fontSize={"15px"}
                      fontWeight={"bold"}
                      fontFamily={"poppins"}
                    >
                      <Icon as={RiCoinsFill} /> Creditos: {credits}
                    </Flex>
                    <Flex
                      gap={1}
                      mt="2"
                      fontSize={"15px"}
                      display={"flex"}
                      textAlign={"center"}
                      align={"center"}
                    >
                      <Icon as={HiOfficeBuilding} textAlign={"center"} />{" "}
                      {office === "1" ? (
                        <Text>Back-office</Text>
                      ) : office === "2" ? (
                        <Text>Comercial</Text>
                      ) : (
                        <Text>ADM</Text>
                      )}
                    </Flex>
                    {office === '3' &&
                    <Box>
                      <Link to={'/admin/create'}><CustomButton/></Link>
                    </Box>
                    }
                  </Text>
                  <Box mt={2} textAlign={'center'} cursor={'pointer'} fontWeight={'bold'} borderRadius={'4px'} onClick={handleLogout} bg={'red.400'} color={'white'}>
                   <Icon as={CiLogout }/> Deslogar
                  </Box>
                </Box>
              </Flex>
            </Flex>
            <Flex flexDir={"column"} bg={"#0D2434"} h={"100%"} align={"center"}>
              <Box>
                <Input
                  {...register("numeroRegistro")}
                  border={"none"}
                  h={"50px"}
                  fontSize={"20px"}
                  color={"white"}
                  fontFamily={"poppins"}
                  bg={"#143a55"}
                  type="text"
                  placeholder="Numero Proposta"
                />
              </Box>
              <Box mt={"20px"}>
                <SearchButton
                  type="submit"
                  onClick={() => {
                    handleSubmit(onSubmitComercial)();
                  }}
                >
                  Enviar
                </SearchButton>
              </Box>
            </Flex>
          </form>
          <Flex></Flex>
          <Flex
            w={"80vw"}
            margin={"0 auto"}
            mt="20px"
            h={"100vh"}
            color={"white"}
            align={"center"}
            flexDir={"column"}
          >
            {!formDataIsSubmited && <div>{isLoading && <Loading />}</div>}
            {formDataIsSubmited && <PDFGenerator send={receivedApiResponse} />}
            {receivedApiResponse && (
              <Text mt='15px' fontFamily={"poppins"}>{receivedApiResponse!.gerado === 'Dados puxados do banco de dados' ? <Text color='green'>{receivedApiResponse!.gerado}</Text> : <Text color='red'>{receivedApiResponse!.geradoo}</Text> }
                
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
