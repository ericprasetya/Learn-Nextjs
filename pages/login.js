import { useMutation } from "@/hooks/useMutation";
import {
  Flex,
  Stack,
  Heading,
  FormControl,
  Input,
  Button,
  useToast
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const { mutate} =  useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    console.log("payload => ", payload);
    const response = await mutate({
      url: "https://service.pace-unv.cloud/api/login",
      payload: payload,
    });
    console.log("response => ", response);
    if (response.success == true) {
      console.log("Login Success");
      Cookies.set("user_token", response.data.token, {
        expires: new Date(response.data.expires_at),
        path: "/",
      });
      router.push("/");
    } else {
      toast({
        title: "Login Failed",
        description: response.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    }
  }

  return (
    <Flex alignItems="center" justifyContent="center">
      <Stack direction="column">
        <Heading as="h4">Login</Heading>
        <FormControl>
          <Input value={payload.email} onChange={(e) => setPayload({ ...payload, email: e.target.value})} type="email" placeholder="Email" />
        </FormControl>
        <FormControl>
          <Input value={payload.password} onChange={(e) => setPayload({ ...payload, password: e.target.value})} type="password" placeholder="Password" />
        </FormControl>
        <FormControl>
          <Button onClick={HandleSubmit} colorScheme="blue">Submit</Button>
        </FormControl>
      </Stack>
    </Flex>
  );
}
