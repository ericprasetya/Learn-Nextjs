import dynamic from "next/dynamic";
import {
  Flex,
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Input,
  Button,
  Box,
  Textarea
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@/hooks/useMutation";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNote() {
  const { mutate } = useMutation()
  const router = useRouter();
  const [note, setNote] = useState({
    title: "",
    description: ""
  });

  const handleSubmit = async () => {
    const response = await mutate({
      url: "https://service.pace-unv.cloud/api/notes",
      payload: note
    })
    if(response.success == true) {
      router.push('/notes')
    }
  }

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Card margin="5" padding="5">
          <Heading>Add Note</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input type="text" onChange={(e) => setNote({ ...note, title: e.target.value})} />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea onChange={(e) => setNote({ ...note, description: e.target.value})} />
            </GridItem>
            <GridItem>
              <Button onClick={handleSubmit} colorScheme="blue">Submit</Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}
