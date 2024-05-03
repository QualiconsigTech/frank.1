import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Extract } from "../../api/login";
import { useEffect, useState } from "react";
import PDFViewer from "../../../components/pdfGenerator";
export default function GetExtract() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formDataIsSubmited, setFormDataSubmited] = useState(false);
  const [receivedApiResponse, setReceivedApiResponse] = useState();
  const [username, setUsername] = useState<any>();
  const [office, setOffice] = useState<any>();
  const receivedToken = () => {
    const username = localStorage.getItem("username");
    const office = localStorage.getItem("office");
    setOffice(office);
    setUsername(username);
    console.log(username, office);
  };

  const onSubmitComercial: SubmitHandler<any> = async (data) => {
    const newData = await data.numeroRegistro;
    const dataRe = await Extract(newData);
    console.log(dataRe);
    setReceivedApiResponse(dataRe);
    setInterval(() => {
      if (dataRe) {
        setFormDataSubmited(true);
      }
    }, 2000);
  };

  const onSubmitBackOffice = async (data:any) => {

  }

  useEffect(() => {
    receivedToken();
  });
  return (
    <>
      <Flex bg={"#0D2434"} h={"100vh"}>
        <Flex flexDir={"column"}>
          <form onSubmit={handleSubmit(onSubmitComercial)}>
            <Flex h={"10vh"}  justify={"center"} w={"100vw"}>
              <Flex w={"90%"} mt={'20px'} align={'center'} justify={"space-between"}>
                <Flex w={"50%"} align={"center"}>
                  <Image
                    mt="20px"
                    ml={"20px"}
                    w={"10%"}
                    h={"100%"}
                    src={"../../../public/franklimpo.png"}
                  />
                  <Text color={"white"} fontFamily={"poppins"} fontSize={20}>
                    Frank puxa extrato
                  </Text>
                </Flex>
                <Box>
                  <Text color={"white"} fontSize={"12px"} fontFamily={"Roboto"}>
                    {username} -- {office === "1" ? <Text>Back-office</Text> : office === "2" ? <Text>Consultor</Text> : <Text>ADM</Text>}

                  </Text>
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
                <Button
                  type="submit"
                  border={"none"}
                  bg={"#06c0e0"}
                  _hover={{ bg: "#0f8196" }}
                  transition={"all ease 0.2s"}
                >
                  Enviar
                </Button>
              </Box>
            </Flex>
          </form>
          <Flex></Flex>
          <Flex
            justify="center"
            w={"80vw"}
            margin={"0 auto"}
            mt="20px"
            h={"100vh"}
          >
            {/* {formDataIsSubmited === true && (
              <PDFViewer propsResponse={receivedApiResponse} />
            )} */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
