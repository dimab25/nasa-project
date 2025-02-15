import "../pages_css/About.css";
import mercury from "../images/mercury.jpg";
import earth from "../images/earth.webp";
import venus from "../images/venus.webp";
import uranus from "../images/uranus.jpg";

import neptune from "../images/neptune.jpg";
import jupiter from "../images/jupiter.jpg";
import mars from "../images/mars.jpg";
import saturn from "../images/saturn.jpg";
import sun from "../images/sun.jpg";
import dwarf from "../images/dwarf-planets.webp";
import { Card } from "react-bootstrap";
import { Link } from "react-router";

function About() {
  fetch("https://api.le-systeme-solaire.net/rest/bodies/")
    .then((response) => response.json())
    .then((data) => {
      const planets = data.bodies.filter((body) => body.isPlanet);
      console.log(planets);
    });

  return (
    <div className="planetsContainer">
      <h5>About</h5>
      <p>
        The solar system has eight planets: Mercury, Venus, Earth, Mars,
        Jupiter, Saturn, Uranus, and Neptune. There are five officially
        recognized dwarf planets in our solar system: Ceres, Pluto, Haumea,
        Makemake, and Eris.
      </p>
      <div className="iframeContainer">
        <iframe
          src="https://eyes.nasa.gov/apps/solar-system/?featured=false&shareButton=false&menu=false&hideFullScreenToggle=true"
          style={{ height: "500px", width: "100%" }}
        ></iframe>
      </div>
      <Card className="eachPlanetDiv" style={{ height: "auto" }}>
        <Link to={`/`}>
          <Card.Img
            className="planetImages"
            variant="top"
            src={sun}
            alt=""
            style={{ width: "300px", borderRadius: "50%" }}
          />
          <Card.Body>
            <Card.Text>Sun</Card.Text>
          </Card.Body>
        </Link>
      </Card>

      <div className="outerAboutDiv">
        <div className="containerAbout">
          <Card className="eachPlanetDiv">
            <Card.Img
              className="planetImages"
              variant="top"
              src={earth}
              alt=""
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Earth</Card.Text>
            </Card.Body>
          </Card>

          <Card className="eachPlanetDiv">
            <Card.Img
              className="planetImages"
              variant="top"
              src={jupiter}
              alt=""
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Jupiter</Card.Text>
            </Card.Body>
          </Card>

          <Card className="eachPlanetDiv">
            <Card.Img
              className="planetImages"
              variant="top"
              src={mars}
              alt=""
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Mars</Card.Text>
            </Card.Body>
          </Card>

          <Card className="eachPlanetDiv">
            <Card.Img
              className="planetImages"
              variant="top"
              src={mercury}
              alt=""
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Mercury</Card.Text>
            </Card.Body>
          </Card>

          <Card className="eachPlanetDiv">
            <Card.Img
              className="planetImages"
              variant="top"
              src={neptune}
              alt=""
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Neptune</Card.Text>
            </Card.Body>
          </Card>

          <Card className="eachPlanetDiv">
            <Card.Img
              className="planetImages"
              variant="top"
              src={saturn}
              alt=""
              style={{ width: "300px" }}
            />
            <Card.Body>
              <Card.Text>Saturn</Card.Text>
            </Card.Body>
          </Card>

          <Card className="eachPlanetDiv">
            <Card.Img
              className="planetImages"
              variant="top"
              src={uranus}
              alt=""
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Uranus</Card.Text>
            </Card.Body>
          </Card>

          <Card className="eachPlanetDiv">
            <Card.Img
              className="planetImages"
              variant="top"
              src={venus}
              alt=""
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Venus</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="dwarfDiv">
        <Card className="eachPlanetDiv">
          <Card.Img
            className="planetImages"
            variant="top"
            src={dwarf}
            alt=""
            style={{ width: "400px", borderRadius: "30px" }}
          />
          <Card.Body>
            <Card.Text>Dwarf Planets</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default About;
