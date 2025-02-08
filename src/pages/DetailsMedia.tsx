import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

export interface Root {
  collection: Collection;
}

export interface Collection {
  version: string;
  href: string;
  items: Item[];
  metadata: Metadata;
}

export interface Item {
  href: string;
  data: Daum[];
  links: Link[];
}

export interface Daum {
  center: string;
  date_created: string;
  description: string;
  description_508: string;
  keywords: string[];
  media_type: string;
  nasa_id: string;
  title: string;
}

export interface Link {
  href: string;
  rel: string;
  render: string;
  width: number;
  size: number;
  height: number;
}

export interface Metadata {
  total_hits: number;
}

function DetailsMedia() {
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");
  console.log("idquery", idQuery);

  const nasaUrl = `https://images-api.nasa.gov/search?q=${idQuery}`;

  console.log("nasaurl", nasaUrl);
  const [pictures, setPictures] = useState<Root | null>(null);

  const getPictureOfTheDay = () => {
    fetch(nasaUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const pictureOfTheDay = result as Root;

        setPictures(pictureOfTheDay);
        console.log("picture", pictureOfTheDay);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  
    // const linkPosition = pictures.collection.items[0].links.length - 1;
  

  useEffect(() => {
    getPictureOfTheDay();
  }, []);

  return (
    <>
      <div>DetailsMedia</div>

      {pictures && <p>{pictures.collection.items[0].data[0].media_type}</p>}
      {/* {pictures && <p>{linkPosition}</p>} */}
      {pictures && <p>{pictures.collection.items[0].data[0].description}</p>}
      {pictures && (
        <Image
          src={pictures.collection.items[0].links[0].href}
          style={{ width: "700px" }}
          fluid
        />
      
      )}
      
    </>
  );
}

export default DetailsMedia;
