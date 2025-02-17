import { Link } from "react-router";
import useFetchHook from "../../hooks/useFetchHook";
import { Bodies } from "../../types/customTypes";
import { Button } from "react-bootstrap";

function Saturn() {
  const { data } = useFetchHook<Bodies>(
    "https://api.le-systeme-solaire.net/rest/bodies/saturn"
  );
  // console.log("data", data);
  return (
    <>
      <div className="singlePlanetContainer">
      <div className="headlinePlanet">
          <Link to={`/neptune`}>
          <Button variant="outline-success"  >{"<"} </Button>
          </Link>
          <h2>{data?.englishName} </h2>{" "}
          <Link to={`/uranus`}>
          <Button variant="outline-success"  >{">"} </Button>
          </Link>{" "}
        </div>
        <p>
          Definition: Best known for its spectacular ring system made of ice and
          rock, Saturn is a gas giant with a dense atmosphere. It has many
          moons, including Titan, which has rivers and lakes of liquid methane.
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
            src="https://eyes.nasa.gov/apps/solar-system/#/saturn?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true"
            style={{ height: "500px", width: "100%" }}
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Saturn;
