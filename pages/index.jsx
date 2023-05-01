import Image from "next/image";
import { Welcome } from "./welcome";
import { Gallery } from "./components";
import { useState } from "react";

const Home = () => {
  const NFTs = Gallery();

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Welcome />
        <Gallery />
      </div>
    </div>
  );
};

export default Home;
