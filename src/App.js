import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PublicNavbar from "./components/PublicNavbar";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "./components/SideMenu";
import WeatherInfo from "./components/WeatherInfo";
import { ClipLoader } from "react-spinners";
import { cities } from "./config";

const API_KEY = process.env.REACT_APP_API_KEY;

// <ClipLoader color="#f86c6b" size={150} loading={true} />

const App = () => {
  const [geoLocation, setGeoLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const url = getURL(geoLocation.latitude, geoLocation.longitude);

  function getURL(latitude, longitude) {
    if (selectedCity)
      return `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&appid=${API_KEY}`;
    if (!latitude || !longitude) return "";
    return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  }

  useEffect(() => {
    console.log("Loading location");
    setLoading(true);
    const onPosition = (position) => {
      setGeoLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
      setLoading(false);
    };
    const onError = (error) => {
      setGeoLocation({ position: null, error: error });
      setLoading(false);
    };
    navigator.geolocation.getCurrentPosition(onPosition, onError);
    const listener = navigator.geolocation.watchPosition(onPosition, onError);
    return () => navigator.geolocation.clearWatch(listener);
  }, []);

  useEffect(() => {
    console.log("Loading weather");
    if (!url) return;
    const getWeather = async (url) => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setWeather(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getWeather(url);
  }, [url]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setSelectedCity(null);
    } else {
      setSelectedCity(city);
    }
  };

  return (
    <>
      <PublicNavbar />
      <Container fluid>
        <Row>
          <Col md={3} className="d-none d-md-block">
            <SideMenu
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={selectedCity}
            />
          </Col>
          <Col md={9}>
            {loading ? (
              <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                <ClipLoader color="#f86c6b" size={150} loading={true} />
              </div>
            ) : (
              <WeatherInfo weather={weather} />
            )}

            {/* <br /><br /><br />
            {geoLocation.loading
              ? "Loading.."
              : geoLocation.latitude
              ? `Latitude: ${geoLocation.latitude} Longitude: ${geoLocation.longitude}`
              : ""} */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
