import Layout from "@/layout";
import Image from "next/image";

export default function Profile() {
  return (
    <>
      <Layout metaTitle="Profile" metaDescription="Semua informasi ini adalah seputar profile user">
        <h1>Profile</h1>
    <Image src="/next.svg"
      alt="Picture of the author"
      width={500}
      height={500}
      blurDataURL="data:..." otomatis di provide
      placeholder="blur" // opsi blur-up ketika load image
    />
      </Layout>
    </>
  );
}
