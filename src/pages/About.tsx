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
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router";

function About() {

  return (
    <div className="planetsContainer">
      <h5>About</h5>
      <p>
        The solar system has eight planets: Mercury, Venus, Earth, Mars,
        Jupiter, Saturn, Uranus, and Neptune. There are five officially
        recognized dwarf planets in our solar system: Ceres, Pluto, Haumea,
        Makemake, and Eris.
      </p>

      <div className="sunDiv">
        <div style={{ width: "400px" }}>
          <Image
            src={sun}
            alt="image"
            style={{ width: "auto", borderRadius: "50%" }}
            fluid
          />
        </div>

        <div style={{ width: "800px" }}>
          <h6>The Sun: Our Cosmic Powerhouse </h6>
          <p>
            The Sun is a giant ball of plasma, 109 times wider than Earth, with
            a core temperature of 15 million°C (27 million°F). At 4.6 billion
            years old, it powers our solar system through nuclear fusion,
            turning hydrogen into helium. Its solar winds shape space weather,
            affecting satellites and power grids. Despite its size, the Sun is
            just a medium-sized star in a vast universe!
          </p>
        </div>
      </div>
      <div className="iframeContainer">
        <iframe
          src="https://eyes.nasa.gov/apps/solar-system/#/home?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&hideExternalLinks=true"
          style={{ height: "500px", width: "100%" }}
        ></iframe>
      </div>
      <div className="outerAboutDiv">
        <div className="containerAbout">
          <Card className="eachPlanetDiv">
            <Link to={`/earth`}>
              <Card.Img
                className="planetImages"
                variant="top"
                src={earth}
                alt="image"
                style={{ width: "300px", borderRadius: "50%" }}
              />
              <Card.Body>
                <Card.Text>Earth</Card.Text>
              </Card.Body>
            </Link>
          </Card>

          <Card className="eachPlanetDiv">
          <Link to={`/jupiter`}>
            <Card.Img
              className="planetImages"
              variant="top"
              src={jupiter}
              alt="image"
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Jupiter</Card.Text>
            </Card.Body>
            </Link>
          </Card>

          <Card className="eachPlanetDiv">
          <Link to={`/mars`}>
            <Card.Img
              className="planetImages"
              variant="top"
              src={mars}
              alt="image"
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Mars</Card.Text>
            </Card.Body>
            </Link>
          </Card>

          <Card className="eachPlanetDiv">
          <Link to={`/mercury`}>
            <Card.Img
              className="planetImages"
              variant="top"
              src={mercury}
              alt="image"
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Mercury</Card.Text>
            </Card.Body>
            </Link>
          </Card>

          <Card className="eachPlanetDiv">
          <Link to={`/neptune`}>
            <Card.Img
              className="planetImages"
              variant="top"
              src={neptune}
              alt="image"
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Neptune</Card.Text>
            </Card.Body>
            </Link>
          </Card>

          <Card className="eachPlanetDiv">
          <Link to={`/saturn`}>
            <Card.Img
              className="planetImages"
              variant="top"
              src={saturn}
              alt="image"
              style={{ width: "300px", height: "300px" }}
            />
            <Card.Body>
              <Card.Text>Saturn</Card.Text>
            </Card.Body>
            </Link>
          </Card>

          <Card className="eachPlanetDiv">
          <Link to={`/uranus`}>
            <Card.Img
              className="planetImages"
              variant="top"
              src={uranus}
              alt="image"
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Uranus</Card.Text>
            </Card.Body>
            </Link>
          </Card>

          <Card className="eachPlanetDiv">
          <Link to={`/venus`}>
            <Card.Img
              className="planetImages"
              variant="top"
              src={venus}
              alt="image"
              style={{ width: "300px", borderRadius: "50%" }}
            />
            <Card.Body>
              <Card.Text>Venus</Card.Text>
            </Card.Body>
            </Link>
          </Card>
        </div>
      </div>

      <div className="dwarfDiv">
        {/* <Card className="eachPlanetDiv"> */}
        <Link to={`/dwarf`}>
        <Image
          className="planetImages"
          src={dwarf}
          alt="image"
          style={{ width: "1200px" }}
          fluid
        />
        <Card.Body>
          <Card.Text>Dwarf Planets</Card.Text>
        </Card.Body></Link>
      </div>
    </div>
  );
}

export default About;
