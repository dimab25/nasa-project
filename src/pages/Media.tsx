import { ChangeEvent, useEffect, useState } from "react";
import Search from "../component/Search";
import { Image } from "react-bootstrap";
import { Link } from "react-router";
import { Item } from "../types/customTypes";

function Media() {
  const [itemImages, setItemImages] = useState<Item[] | null>(null);
  const [keyword, setKeyword] = useState("earth");

  const searchUrl = `https://images-api.nasa.gov/search?q=${keyword}&media_type=image`;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
  };
 
  useEffect(() => {
    let controller: AbortController;
    const fetchSearchImage = () => {
      controller = new AbortController();
      const signal = controller.signal;
      fetch(searchUrl, { signal: signal })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          const untypedItems = result.collection.items;
          const definedItems = untypedItems as Item[];
          setItemImages(definedItems);
                 })
        .catch((error) => {
          console.log("error", error);
        });
    };
    fetchSearchImage();

    return () => {
      controller.abort();
    };
  }, [keyword]);

  return (
    <>
      <div className="profileContainer">
        <Search handleInputChange={handleInputChange} />
        <div className="containerMedia">
          {itemImages &&
            itemImages.map((item: Item) => (
              <div key={item.data[0].nasa_id}>
                {item.links.length > 0 && (
                  <p>
                    <Link to={`/detailsMedia/?id=${item.data[0].nasa_id}`}>
                      <Image
                        src={item.links[1].href}
                        alt="image"
                        style={{ width: "700px" }}
                        fluid
                      />
                    </Link>
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Media;
