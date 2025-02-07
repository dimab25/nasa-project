import "./App.css";
import Day_Picture from "./pages/Day_Picture";
import Home from "./pages/Home";
import NavBar from "./component/NavBar";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Planets from "./pages/Planets";
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
              <Route path="/planets" element={<Planets />} />
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
