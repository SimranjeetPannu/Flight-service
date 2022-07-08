import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FlightForm, EditFlight, FlightList, Error } from "./pages";
import React from "react";
import { NavBar } from "./components/features/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "./image4.jpg";

const App = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background} )`,
          backgroundSize: "cover",
          height: "100vh",
          color: "black",
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<FlightList />} />
            <Route path="/add" element={<FlightForm />} />
            <Route path="/edit/:id" element={<EditFlight />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
      <footer>
        <p>@2022 USA Travel, Inc.</p>
      </footer>
    </>
  );
};

export default App;
