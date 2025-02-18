import { Link } from "react-router";
import useFetchHook from "../../hooks/useFetchHook";
import { Bodies } from "../../types/customTypes";
import { Button } from "react-bootstrap";

function Mars() {
  const { data } = useFetchHook<Bodies>(
    "https://api.le-systeme-solaire.net/rest/bodies/mars"
  );

  return (
    <>
      <div className="singlePlanetContainer">
      <div className="headlinePlanet">
          <Link to={`/jupiter`}>
          <Button variant="outline-success"  >{"<"} </Button>
          </Link>
          <h2>{data?.englishName} </h2>{" "}
          <Link to={`/mercury`}>
          <Button variant="outline-success"  >{">"} </Button>
          </Link>{" "}
        </div>
        <p>
          Definition: Known as the "Red Planet" due to its iron-rich soil, Mars
          has the largest volcano in the solar system (Olympus Mons) and deep
          canyon systems. It has a thin atmosphere and evidence suggests it once
          had liquid water.
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
            src="https://eyes.nasa.gov/apps/solar-system/#/mars?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true"
            style={{ height: "500px", width: "100%" }}
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Mars;
