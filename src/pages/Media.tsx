import { ChangeEvent, useEffect, useState } from "react";
import Search from "../component/Search";

interface Item {
  href: string;
  data: Daum[];
  links: Link[];
}

interface Daum {
  center: string;
  date_created: string;
  description: string;
  description_508?: string;
  keywords: string[];
  media_type: string;
  nasa_id: string;
  secondary_creator?: string;
  title: string;
  album?: string[];
  location?: string;
}

interface Link {
  href: string;
  rel: string;
  render: string;
  width?: number;
  size?: number;
  height?: number;
}

function Media() {
  const [itemImage, setItemImage] = useState<Item | null>(null);

 

  const [keyword, setKeyword] = useState("earth");

  const searchUrl = `https://images-api.nasa.gov/search?q=${keyword}&media_type=image`;

  const fetchSearchImage = () => {
    fetch(searchUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const untypedItems = result.collection.items;
        const definedItems = untypedItems as Item;
        setItemImage(definedItems);
        console.log("imageitem", definedItems);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    
    setKeyword(e.target.value);
  };
  
  // useEffect hook close to the return
  useEffect(() => {
    fetchSearchImage();
  }, [keyword]);

  return (
    <>
      <div>
        <Search handleInputChange={handleInputChange} />
        <div className="imageContainer">
          {itemImage &&
            itemImage.map((item: Item) => (
              <div>
                {/* {item.links.map((single, index)=> (<img key={index} src= {single.href} /> ))} */}

                {/* {item.data.map((singleInfo )=> (<div> {singleInfo.title}</div>  ))} */}

                {item.links.length > 0 && (
                  <img
                    src={item.links[0].href}
                    alt=""
                    style={{ width: "300px" }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Media;
