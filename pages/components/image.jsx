import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
const ImageRow = ({ nfts }) => {
  const hexCode = "#38946d";
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 ">
      {nfts.map((nft) => (
        <div key={nft.id.tokenId} className="p-2 image-container ">
          <BlurImage key={nft.id.tokenId} image={nft} />
          <p>{nft.name}</p>
        </div>
      ))}
    </div>
  );
};

function findTrait({ image, trait }) {
  let traitObj = null;
  if (image.metadata.attributes) {
    traitObj = image.metadata.attributes.find((t) => t.trait_type === trait);
  }
  return traitObj ? traitObj.value : "None";
}

function CreateCard({ image, imageTraits }) {
  useEffect(() => {
    const container = document.querySelector(".container");
    const card = document.querySelector(".card");
    const title = document.querySelector(".title");
    const id = document.querySelector(".id");
    const pog = document.querySelector(".pog img");
    const description = document.querySelector(".traits");

    container.addEventListener("mousemove", (e) => {
      let xAxis = (window.innerWidth / 2 - (e.pageX - window.scrollX)) / 25;
      let yAxis = (window.innerHeight / 2 - (e.pageY - window.scrollY)) / 25;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    //Animate In
    container.addEventListener("mouseenter", (e) => {
      card.style.transition = "none";
      //Popout
      title.style.transform = "translateZ(150px)";
      id.style.transform = "translateZ(125px)";
      pog.style.transform = "translateZ(150px) scale(1.10,1.10)";
      pog.style.transition = "all 1s ease";
      description.style.transform = "translateZ(125px)";
    });

    //Animate Out
    container.addEventListener("mouseleave", (e) => {
      card.style.transition = "all 0.5s ease";
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      //Popback
      id.style.transform = "translateZ(0px)";
      title.style.transform = "translateZ(0px)";
      pog.style.transform = "scale(1,1)";
      description.style.transform = "translateZ(0px)";
    });
  }, []);
  return (
    
    <div
      class="container"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 999,
        width: "20rem",
        maxHeight: "60%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <div
        class="card"
        style={{
          backgroundColor: "white",
          position: "relative"
        }}
      >
        <div class="pog">
          <div class="circle"></div>

          <img
            src={image.metadata.image}
            className={classNames("duration-250 ease-in-out rounded-lg")}
          />
        </div>
        
        <div class="info">
          <h1 class="title ">Pog Punks</h1>
          <h4 class="id">
            Token ID: {image.id.tokenId ? image.id.tokenId.substr(-4) : "n/a"}
          </h4>
          <div class="traits">
            <h4>Accessory: {imageTraits.accessory}</h4>
            <h4>Hair: {imageTraits.hair}</h4>
            <h4>Face: {imageTraits.face}</h4>
            <h4>Nose: {imageTraits.nose}</h4>
            <h4>Glasses: {imageTraits.glasses}</h4>
            <h4>Mouth: {imageTraits.mouth}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlurImage({ image }) {
  const [card, setCard] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isCentered, setIsCentered] = useState(false);

  const containerRef = useRef(null);
  const imageTraits = {
    mouth: findTrait({ image, trait: "Mouth" }),
    accessory: findTrait({ image, trait: "Accessory" }),
    hair: findTrait({ image, trait: "Hair" }),
    nose: findTrait({ image, trait: "Nose" }),
    face: findTrait({ image, trait: "Face" }),
    glasses: findTrait({ image, trait: "Glasses" }),
  };
  const handleClick = () => {
    setIsCentered(!isCentered);
    if (isCentered) {
      setCard(null);
      const cardComponent = (
        <CreateCard image={image} imageTraits={imageTraits} />
      );
      setCard(cardComponent);
      const imageContainers = document.getElementsByClassName("group");
      for (let i = 0; i < imageContainers.length; i++) {
        const imageContainer = imageContainers[i];
        if (imageContainer !== containerRef.current) {
          imageContainer.removeEventListener("click", handleClick);
        }
      }
    } else {
      setCard(null);
      const imageContainers = document.getElementsByClassName("group");
      for (let i = 0; i < imageContainers.length; i++) {
        const imageContainer = imageContainers[i];
        if (imageContainer !== containerRef.current) {
          imageContainer.addEventListener("click", handleClick);
        }
      }
    }
  };

  return (
    <>
      <a
        href={image.metadata.image}
        className="group"
        onClick={(event) => {
          event.preventDefault();
          handleClick();
        }}
        ref={containerRef}
      >
        <div
          className={classNames(
            "aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-36946e-200"
          )}
          
          
        >
          <img
            src={image.metadata.image}
            className={classNames(
              "duration-250 ease-in-out group-hover:opacity-75",
              isLoading ? "grayscale blur" : ""
            )}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </div>
      </a>
      {card}
    </>
  );
}

export default ImageRow;
