import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Update } from "../src/api/login";
import { useState } from "react";

export const UserModificated = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [isLoad, setIsLoad] = useState(false)
  const [hasIcon, setHasIcon] = useState(false)

  const handleModificateOffice: SubmitHandler<any> = async (data) => {
    setIsLoad(true)
    const upd = await Update(data)
    if(upd) {
      setIsLoad(false)
      setHasIcon(true)
      setInterval(() => {
        setHasIcon(false)
      },2000)
    }
  };

  return (
    <Box  p={10} borderRadius={"7px"}>
      <form onSubmit={handleSubmit(handleModificateOffice)}>
        <Text fontWeight={"650"} mb={2} color={"#d3c22c"}>
          Alterar Cargo
        </Text>
        <Flex justify={"center"} flexDir={"column"} gap={2}>
          <Input
            color={"white"}
            border={"none"}
            bg={"#1d1c2d"}
            placeholder={"nome do usuario"}
            {...register("username")}
          />
          <Select
            color={"white"}
            border={"none"}
            bg={"#1d1c2d"}
            placeholder="Selecione o cargo"
            {...register("officeId")}
          >
            <option
              style={{
                background: "#1d1c2d",
              }}
              value="3"
            >
              Administrador
            </option>
            <option
              style={{
                background: "#1d1c2d",
              }}
              value="1"
            >
              Back-office
            </option>
            <option
              style={{
                background: "#1d1c2d",
              }}
              value="2"
            >
              Comercial
            </option>
          </Select>
          <Button type="submit" bg="#F4E04D">
            Alterar cargo
          </Button>
        </Flex>
        {hasIcon &&
           <Text mt={2} color='green.500'>Usuario Modificado</Text>
        }
      
      </form>
    </Box>
  );
};
