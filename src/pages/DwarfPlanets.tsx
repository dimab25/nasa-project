import eris from "../images/eris.jpg";
import ceres from "../images/ceres.jpg";
import pluto from "../images/pluto.jpg";
import haumea from "../images/haumea.jpg";
import makemake from "../images/makemake.jpg";
import { Image } from "react-bootstrap";

function DwarfPlanets() {
  console.log("hallo");
  return (
    <>
      <div className="planetsContainer">
        <h5>Dwarf Planets</h5>

        <div className="sunDiv">
          <div style={{ width: "300px" }}>
            <Image
              className="planetImages"
              src={pluto}
              alt="image"
              style={{ width: "auto", borderRadius: "50%" }}
              fluid
            />
          </div>

          <div style={{ width: "800px" }}>
            <h6>Pluto </h6>
            <p>
              The most famous dwarf planet, once considered the ninth planet. It
              has a thin atmosphere of nitrogen and methane and five moons,
              including Charon, which is nearly half its size.
            </p>
          </div>
        </div>

        <div className="sunDiv2">
          <div style={{ width: "300px" }}>
            <Image
              className="planetImages"
              src={ceres}
              alt="image"
              style={{ width: "auto", borderRadius: "50%" }}
              fluid
            />
          </div>

          <div style={{ width: "800px" }}>
            <h6>Ceres </h6>
            <p>
              The largest object in the asteroid belt between Mars and Jupiter.
              Ceres is made of rock and ice and may have a hidden subsurface
              ocean of salty water.
            </p>
          </div>
        </div>

        <div className="sunDiv">
          <div style={{ width: "300px" }}>
            <Image
              className="planetImages"
              src={eris}
              alt="image"
              style={{ width: "auto", borderRadius: "50%" }}
              fluid
            />
          </div>

          <div style={{ width: "800px" }}>
            <h6>Eris </h6>
            <p>
              Almost the same size as Pluto but much farther out in the Kuiper
              Belt. Eris is extremely cold and has a moon called Dysnomia. Its
              discovery led to Pluto’s reclassification as a dwarf planet in
              2006.
            </p>
          </div>
        </div>

        <div className="sunDiv2">
          <div style={{ width: "300px" }}>
            <Image
              className="planetImages"
              src={haumea}
              alt="image"
              style={{ width: "auto", borderRadius: "50%" }}
              fluid
            />
          </div>

          <div style={{ width: "800px" }}>
            <h6>Haumea </h6>
            <p>
              A fast-spinning dwarf planet in the Kuiper Belt with an unusual
              elongated shape. It has two moons and a surface likely covered in
              water ice.{" "}
            </p>
          </div>
        </div>

        <div className="sunDiv">
          <div style={{ width: "300px" }}>
            <Image
              className="planetImages"
              src={makemake}
              alt="image"
              style={{ width: "auto", borderRadius: "50%" }}
              fluid
            />
          </div>

          <div style={{ width: "800px" }}>
            <h6>Makemake </h6>
            <p>
              Another Kuiper Belt object with a bright, icy surface. Makemake
              has one known moon and an extremely thin atmosphere, possibly made
              of methane.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DwarfPlanets;
