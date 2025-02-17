import { Image } from "react-bootstrap";
import nasaLogo from "../images/NASA_Worm_logo.svg.png";
function Footer() {
  return (
    <>
    <div className="footerDiv"> <Image src={nasaLogo} alt="nasalogo" style={{width:"500px"}} fluid />
    <div>Copyright © 2025 D. Bauer</div>
    </div>
    </>

  )
}

export default Footer