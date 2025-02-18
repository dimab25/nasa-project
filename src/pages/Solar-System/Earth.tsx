import { Bodies } from "../../types/customTypes";
import useFetchHook from "../../hooks/useFetchHook";
import { Link } from "react-router";
import { Button } from "react-bootstrap";

function EarthPage() {
  const { data } = useFetchHook<Bodies>(
    "https://api.le-systeme-solaire.net/rest/bodies/earth"
  );
 

  return (
    <>
      <div className="singlePlanetContainer">
        <div className="headlinePlanet">
          <Link to={`/venus`}>
            <Button variant="outline-success"  >{"<"} </Button>
          </Link>
          <h2>{data?.englishName} </h2>{" "}
          <Link to={`/jupiter`}>
            <Button variant="outline-success">{">"}</Button>
          </Link>{" "}
        </div>
        <p>
          Definition: The only planet known to support life, Earth has a
          balanced atmosphere with oxygen and water covering about 70% of its
          surface. It has a stable climate system and a protective magnetic
          field.
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
            src="https://eyes.nasa.gov/apps/solar-system/#/earth?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true"
            style={{ height: "500px", width: "100%" }}
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default EarthPage;
