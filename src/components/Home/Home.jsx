import { useState } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Hero search={search} />
    </>
  );
};

export default Home;
