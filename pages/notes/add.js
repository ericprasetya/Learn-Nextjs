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
const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNote() {
  const router = useRouter();
  const [note, setNote] = useState({
    title: "",
    description: ""
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://service.pace-unv.cloud/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
      });
      const result = await response.json();
      console.log("result => ", result);
      if(result.success == true) {
        router.push("/notes")
      }
    } catch (error) {
      
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
