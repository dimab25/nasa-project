import { Link } from "react-router";
import useFetchHook from "../../hooks/useFetchHook";
import { Bodies } from "../../types/customTypes";
import { Button } from "react-bootstrap";

function Jupiter() {
  const { data } = useFetchHook<Bodies>(
    "https://api.le-systeme-solaire.net/rest/bodies/jupiter"
  );
  // console.log("data", data);

  return (
    <>
      <div className="singlePlanetContainer">
      <div className="headlinePlanet">
          <Link to={`/earth`}>
          <Button variant="outline-success"  >{"<"} </Button>
          </Link>
          <h2>{data?.englishName} </h2>{" "}
          <Link to={`/mars`}>
          <Button variant="outline-success"  >{">"} </Button>
          </Link>{" "}
        </div>
        <p>
          Definition: The largest planet, Jupiter is a gas giant made mostly of
          hydrogen and helium. It has a famous Great Red Spot, a massive storm,
          and at least 90 moons, including Europa, which may have an ocean
          beneath its icy crust.
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
            src="https://eyes.nasa.gov/apps/solar-system/#/jupiter?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true"
            style={{ height: "500px", width: "100%" }}
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Jupiter;
