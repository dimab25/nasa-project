import "./App.css";
import Day_Picture from "./pages/Day_Picture";
import Home from "./pages/Home";
import NavBar from "./component/NavBar";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Planets from "./pages/Planets";
import Media from "./pages/Media";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import DetailsDayPictures from "./pages/DetailsDayPictures";
import Register from "./pages/Register";
import { app, auth } from "./config/firebaseConfig";
import Login from "./pages/Login";

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
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" />

            <Route element={<Root />}>
              <Route index element={<Home />} />
              <Route path="/media" element={<Media />} />
              <Route
                path="/day"
                element={
                  <ProtectedRoute>
                    <Day_Picture />
                  </ProtectedRoute>
                }
              />
              <Route path="/planets" element={<Planets />} />
              <Route path="/detailsDayPicture" element={<DetailsDayPictures />} />
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
