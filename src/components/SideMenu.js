import React from "react";
import { Nav } from "react-bootstrap";

const SideMenu = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <Nav className="flex-column position-fixed sidemenu">
      <Nav.Link
        className={!selectedCity ? "active" : ""}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Nav.Link>
      <div className="hr-line"></div>
      {cities.map((city) => (
        <Nav.Link
          key={city.id}
          className={
            selectedCity && city.id === selectedCity.id ? "active" : ""
          }
          onClick={() => handleCityChange(city)}
        >
          {city.name}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default SideMenu;
