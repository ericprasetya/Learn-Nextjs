// import dynamic from "next/dynamic";
// import Link from "next/link";

// const LayoutComponent = dynamic(() => import("@/layout"));

// export default function Notes({ notes }) {
//   console.log("notes => ", notes);
//   return (
//     <>
//       <LayoutComponent metaTitle="Notes">
//         {notes.data.map((note) => (
//           <div key={note.id} style={{ border: "1px solid grey", marginBottom: "5px" }}>
//             <Link href={`/notes/${note.id}`}>
//               {note.title}
//             </Link>
//           </div>
//         ))}
//       </LayoutComponent>
//     </>
//   );
// }

// export async function getStaticProps() {
//   const res = await fetch("https://service.pace-unv.cloud/api/notes");
//   const notes = await res.json();
//   return { props: { notes }, revalidate: 10 };
// }

import dynamic from "next/dynamic";
import {
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  const { data, error, isLoading } = useSWR(
    'https://service.pace-unv.cloud/api/notes', 
    fetcher,
    {
      revalidateOnFocus: true,
    }
  )
  // const { data, isLoading } = useQueries({
  //   prefixUrl: "https://service.pace-unv.cloud/api/notes",
  // });
  const router = useRouter();
  console.log("data => ", data);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://service.pace-unv.cloud/api/notes/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      console.log("result => ", result);
      if (result.success == true) {
        router.reload();
      }
    } catch (error) {}
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Box padding={5}>
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => router.push("/notes/add")}
            >
              Add Note
            </Button>
          </Flex>
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : (
            <Flex>
              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                {data?.data?.map((note) => (
                  <GridItem key={note.id}>
                    <Card>
                      <CardHeader>
                        <Heading>{note.title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{note.description}</Text>
                      </CardBody>
                      <CardFooter>
                        <Button
                          onClick={() => router.push(`/notes/edit/${note.id}`)}
                          flex="1"
                          variant="ghost"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(note.id)}
                          flex="1"
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          )}
        </Box>
      </LayoutComponent>
    </>
  );
}
