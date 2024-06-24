import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function DetailNote({ notes }) {
  return (
    <LayoutComponent metaTitle="Detail Note">
      <h1 className="font-bold">Detail Note</h1>
      <div>
        <h2>title: {notes.data.title}</h2>
        <p>desc: {notes.data.description}</p>
        <p>updated at: {notes.data.updated_at}</p>
      </div>
    </LayoutComponent>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await res.json();

  const paths = notes.data.map((note) => ({
    params: { 
      id: note.id 
    },
  }));
  return {
    paths,
    fallback: false, // false or "blocking"
  }
}

export async function getStaticProps(context) { 
  const { id } = context.params
  const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
