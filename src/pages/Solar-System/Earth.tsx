import { Bodies } from "../../types/customTypes";
import useFetchHook from "../../hooks/useFetchHook";

function EarthPage() {

  const {data}= useFetchHook<Bodies>(
    "https://api.le-systeme-solaire.net/rest/bodies/terre"
  );
  console.log("data", data);

  // const [info, setInfo] = useState<Bodies | null>(null);

  // const getInfo = () => {
  //   const urlSolarSystem =
  //     "https://api.le-systeme-solaire.net/rest/bodies/terre";
  //   fetch(urlSolarSystem)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((result) => {
  //       const information = result;
  //       setInfo(information);
  //       console.log(information);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  // useEffect(() => {
  //   getInfo();
  // }, []);

  return (
    <>
      <div className="planetsContainer">
        {/* <h2>{info && info.englishName}</h2>
        <p>Definition: </p>
        <p>Gravity: {info?.gravity}</p>
        <p>Radius: {info?.equaRadius} kilometres</p>
        {info?.isPlanet === true ? <p>Type: Planet</p> : <p>Type: Moon</p>} */}
 
        <h2>{data && data.englishName}</h2>
        <p>Definition: The only planet known to support life, Earth has a balanced atmosphere with oxygen and water covering about 70% of its surface. It has a stable climate system and a protective magnetic field.</p>
        <p>Gravity: {data?.gravity}</p>
        <p>Radius: {data?.equaRadius} kilometres</p>
        {data?.isPlanet === true ? <p>Type: Planet</p> : <p>Type: Moon</p>}

        <iframe
          src="https://eyes.nasa.gov/apps/solar-system/#/earth/?featured=false&shareButton=false&menu=false&hideFullScreenToggle=true"
          style={{ height: "400px" }}
        ></iframe>
      </div>
    </>
  );
}

export default EarthPage;
