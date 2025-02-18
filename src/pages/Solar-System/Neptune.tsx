import { Link } from "react-router";
import useFetchHook from "../../hooks/useFetchHook";
import { Bodies } from "../../types/customTypes";
import { Button } from "react-bootstrap";

function Neptune() {
  const { data } = useFetchHook<Bodies>(
    "https://api.le-systeme-solaire.net/rest/bodies/neptune"
  );
   return (
    <>
      <div className="singlePlanetContainer">
      <div className="headlinePlanet">
          <Link to={`/mercury`}>
          <Button variant="outline-success"  >{"<"} </Button>
          </Link>
          <h2>{data?.englishName} </h2>{" "}
          <Link to={`/saturn`}>
          <Button variant="outline-success"  >{">"} </Button>
          </Link>{" "}
        </div>
        <p>
          Definition: The farthest known planet, Neptune is a deep blue ice
          giant with the strongest winds in the solar system. It has a dynamic
          atmosphere with dark storms and is home to Triton, a moon that orbits
          in the opposite direction of its planet.
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
            src="https://eyes.nasa.gov/apps/solar-system/#/neptune?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true"
            style={{ height: "500px", width: "100%" }}
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Neptune;
