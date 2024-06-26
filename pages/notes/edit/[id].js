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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNote() {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
      const getNote = await res.json();
      setNote(getNote.data);
    }
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://service.pace-unv.cloud/api/notes/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: note.title,
          description: note.description
        })
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
          <Heading>Edit Note</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input value={note?.title || ""} type="text" onChange={(e) => setNote({ ...note, title: e.target.value})} />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea value={note?.description || ""} onChange={(e) => setNote({ ...note, description: e.target.value})} />
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
