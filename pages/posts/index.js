import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Posts({ posts }) {
  console.log("posts => ", posts);
  return (
    <>
      <LayoutComponent metaTitle="Posts">
        {posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid grey", marginBottom: "5px" }}>
            <p className="font-bold">{post.title}</p>
            <p>{post.body}</p>
          </div>
        ))}
      </LayoutComponent>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  // Pass data to the page via props
  return { props: { posts } }
}
