import { useEffect, useState, useRef } from "react";
import { ImageRow } from "../components/index";

const Gallery = () => {
  const [NFTs, setNFTs] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  useEffect(() => {
    const fetchNFTsForCollection = async () => {
      const collection = "0x1e1744fFd69296765f0447E88Ac38bE74a4eaD13";
      const apiKey = "A5fkj3exClU-ifZwqMM6cJdt215d3dew";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true&page=${page}`;

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(fetchURL, requestOptions);
      const data = await response.json();
      setNFTs((prevNFTs) => [...prevNFTs, ...data.nfts]);
    };

    fetchNFTsForCollection();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef]);


  return <>
  <ImageRow nfts={NFTs} />
  <div ref={loaderRef}></div>
  </>
};

export default Gallery;
