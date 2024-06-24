import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ notes }) {
  console.log("notes => ", notes);
  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {notes.data.map((note) => (
          <div key={note.id} style={{ border: "1px solid grey", marginBottom: "5px" }}>
            <Link href={`/notes/${note.id}`}>
              {note.title}
            </Link>
          </div>
        ))}
      </LayoutComponent>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
