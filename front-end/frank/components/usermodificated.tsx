import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Update } from "../src/api/login";

export const UserModificated = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleModificateOffice: SubmitHandler<any> = async (data) => {
    Update(data)
  };

  return (
    <Box bg="#353345" w={"40%"} p={10} borderRadius={"7px"}>
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
            {...register("Cargo")}
          >
            <option
              style={{
                background: "#1d1c2d",
              }}
              value="1"
            >
              Administrador
            </option>
            <option
              style={{
                background: "#1d1c2d",
              }}
              value="2"
            >
              Back-office
            </option>
            <option
              style={{
                background: "#1d1c2d",
              }}
              value="3"
            >
              Comercial
            </option>
          </Select>
          <Button type="submit" bg="#F4E04D">
            Alterar cargo
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
