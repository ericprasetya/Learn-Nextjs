import dynamic from "next/dynamic";
import { useEffect } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Main({ children }) {

  useEffect(() => {
    fetch('api/hello')
    .then(res => res.json())
    .then(res => console.log('response => ', res))
    .catch(err => console.log('error => ', err))
  }, [])

  return (
    <>
      <LayoutComponent metaTitle="Home">
        <h1>Home</h1>
      </LayoutComponent>
    </>
  );
}
