import "./App.css";
import Day_Picture from "./pages/Day_Picture";
import Home from "./pages/Home";
import NavBar from "./component/NavBar";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import Media from "./pages/Media";
import { AuthContextProvider } from "./context/AuthContext";
// import dotenv from 'dotenv'; 
// dotenv.config();



import DetailsDayPictures from "./pages/DetailsDayPictures";
import Register from "./pages/Register";

import Login from "./pages/Login";
import { db } from "./config/firebaseConfig";
import Chat from "./pages/Chat";
import DetailsMedia from "./pages/DetailsMedia";
import EarthPage from "./pages/Solar-System/Earth";
import Planets from "./pages/Planets";
import Jupiter from "./pages/Solar-System/Jupiter";
import Mars from "./pages/Solar-System/Mars";
import Mercury from "./pages/Solar-System/Mercury";
import Neptune from "./pages/Solar-System/Neptune";
import Saturn from "./pages/Solar-System/Saturn";
import Uranus from "./pages/Solar-System/Uranus";
import Venus from "./pages/Solar-System/Venus";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

function App() {
  // console.log("auth", auth);
  // console.log(app);
  console.log("dbase", db);

  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" />

            <Route element={<Root />}>
              <Route index element={<Home />} />
              <Route path="/media" element={<Media />} />
              <Route path="/day" element={<Day_Picture />} />
              {/* SolarSystem */}
              <Route path="/planets" element={<Planets />} />
              <Route path="/earth" element={<EarthPage />} />
              <Route path="/jupiter" element={<Jupiter />} />
              <Route path="/mars" element={<Mars />} />
              <Route path="/mercury" element={<Mercury />} />
              <Route path="/neptune" element={<Neptune />} />
              <Route path="/saturn" element={<Saturn />} />
              <Route path="/uranus" element={<Uranus />} />
              <Route path="/venus" element={<Venus />} />

              <Route path="/chat" element={<Chat />} />
              <Route path="/detailsDayPicture"
                element={<DetailsDayPictures />}
              /><Route path="/detailsMedia"
              element={<DetailsMedia />}
            />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
