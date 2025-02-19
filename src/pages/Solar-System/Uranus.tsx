import { Link } from "react-router";
import useFetchHook from "../../hooks/useFetchHook";
import { Bodies } from "../../types/customTypes";
import { Button } from "react-bootstrap";
import { useEffect, useRef } from "react";


function Uranus() {
  const { data } = useFetchHook<Bodies>(
    "https://api.le-systeme-solaire.net/rest/bodies/uranus"
  );

  const topElement = useRef<HTMLDivElement | null>(null)
      useEffect(() => {
          
          if (topElement) {
             topElement.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
          }
         
        }, []);
  

  return (
    <>
    
      <div className="singlePlanetContainer" ref={topElement}>
      <div className="headlinePlanet">
          <Link to={`/saturn`}>
          <Button variant="outline-success"  >{"<"} </Button>
          </Link>
          <h2>{data?.englishName} </h2>{" "}
          <Link to={`/venus`}>
          <Button variant="outline-success"  >{">"} </Button>
          </Link>{" "}
        </div>
        <p>
          Definition: An ice giant with a pale blue-green color due to methane
          in its atmosphere, Uranus is unique because it rotates on its side,
          possibly due to a past collision. It has faint rings and extreme
          seasonal changes.
        </p>
        <p>Gravity: {data?.gravity}</p>
        <p>Radius: {data?.equaRadius} kilometres</p>
        {data?.isPlanet === true ? <p>Type: Planet</p> : <p>Type: Moon</p>}
        <div className="moonsDiv">
          <p>Moons:</p>
          {data &&
            data.moons
              .slice(0, 9)
              .map((file, index) => <p key={index}>{file.moon}&nbsp;</p>)}
        </div>

        <div className="iframeContainer">
          <iframe
            src="https://eyes.nasa.gov/apps/solar-system/#/uranus?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true"
            style={{ height: "500px", width: "100%" }}
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Uranus;
