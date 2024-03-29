import {
  Box,
  Center,
  Divider,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { Controller, useForm } from "react-hook-form";
import SuccessModal from "../components/successModal";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  tour: string;
  seating: "General" | "VIP" | "Sky Box";
  ticketNum: number;
};

const Home: NextPage = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSubmit = handleSubmit((data) => {
    onOpen();
    // toast({
    //   title: "Message Sent!",
    //   description: "Your message has been sent!",
    //   status: "success",
    //   duration: 50000,
    //   isClosable: true,
    // });
  });
  return (
    <div>
      <Head>
        <title>Concert Ticket Registration</title>
        <meta name="description" content="Concert Ticket Registration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SimpleGrid columns={[1, 2]}>
        <Box p={10}>
          <Stack shadow="lg" p={8} spacing={3}>
            <Center>
              <Heading color="green.800" mb={4} size="lg">
                Concert Ticket Registration
              </Heading>
            </Center>

            <Divider />
            <FormControl isInvalid={errors.firstName != null}>
              <FormLabel htmlFor="fname">First Name</FormLabel>
              <Input
                id="fname"
                type="text"
                {...register("firstName", {
                  required: { value: true, message: "First name is required" },
                })}
              />

              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.lastName != null}>
              <FormLabel htmlFor="lname">Last Name</FormLabel>
              <Input
                id="lname"
                type="text"
                {...register("lastName", {
                  required: { value: true, message: "Last name is required" },
                })}
              />

              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email != null}>
              <FormLabel htmlFor="email">Email address </FormLabel>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email is not valid",
                  },
                })}
              />

              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.age != null}>
              <FormLabel htmlFor="age" width={20}>
                Age
              </FormLabel>
              <Input
                type="number"
                width={20}
                {...register("age", {
                  required: { value: true, message: "Age is required" },
                  min: {value: 16, message: 'Invalid age or too young'} 
                })}
              />

              <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.tour != null} pb={3}>
              <FormLabel htmlFor="tour-selector">Date & Tour</FormLabel>
              <Select
                placeholder="Select Tour"
                {...register("tour", {
                  required: {
                    value: true,
                    message: "Tour and date is required",
                  },
                })}
                id="tour-opt"
              >
                <option value="option1" id="tour-1">
                  Grand Royal June 25,2022
                </option>
                <option value="option2" id="tour-2">
                  Maiden Stream July 20,2022
                </option>
                <option value="option3" id="tour-3">
                  Lucky Strike Aug 12, 2022
                </option>
              </Select>
              <FormErrorMessage>{errors.tour?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.seating != null} pb={3}>
              <FormLabel htmlFor="seating">Select Seating</FormLabel>

              <Controller
                control={control}
                name="seating"
                rules={{
                  required: {
                    value: true,
                    message: "Please select an option",
                  },
                }}
                render={({ field: { onChange } }) => (
                  <RadioGroup
                    defaultValue=""
                    onChange={(value) => {
                      onChange(value);
                    }}
                    id="seat-opt"
                  >
                    <Stack spacing={4} direction="row">
                      <Radio value="1" id="radio-1">
                        General
                      </Radio>
                      <Radio value="2" id="radio-2">
                        VIP
                      </Radio>
                      <Radio value="3" id="radio-3">
                        Sky Box
                      </Radio>
                    </Stack>
                  </RadioGroup>
                )}
              />
              <FormErrorMessage>{errors.seating?.message}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="ticketNum"># of ticket</FormLabel>
            </FormControl>

            <FormControl isInvalid={errors.ticketNum != null}>
              <Input
                type="number"
                width={20}
                {...register("ticketNum", {
                  required: {
                    value: true,
                    message: "Number of ticket is required",
                  },
                  min: {value: 1, message: 'Cannot reserve less than 1 ticket'} ,
                  validate: (value) => {
                    if (getValues("age") < 18 && value > 10) {
                      return "Cannot by more than 10 tickets if age is below 18!";
                    }
                  },
                })}
              />
              <FormErrorMessage>{errors.ticketNum?.message}</FormErrorMessage>
            </FormControl>
            <Divider />
            <Center>
              <Button
                colorScheme="teal"
                width="30%"
                onClick={() => {
                  onSubmit();
                }}
              >
                Submit
              </Button>
            </Center>
          </Stack>
        </Box>
        <Box>
          <Image
            src={
              "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
            }
          />
        </Box>
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your ticket has been reserved!</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="whatsapp" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;
