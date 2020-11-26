import React from "react";
import { Card } from "react-bootstrap";

const WeatherInfo = ({ weather }) => {
  const temperatureC = weather ? (weather.main.temp - 273.15).toFixed(2) : "";
  const temperatureF = weather
    ? (((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)
    : "";
  return (
    <Card className="bg-dark text-white main-content">
      {/* <Card.Img src="holder.js/100px270" alt="Card image" /> */}
      <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center">
        <Card.Title>{weather?.name}</Card.Title>
        <Card.Text className="text-success h1">
          {`${temperatureC} °C / ${temperatureF} °F`}
        </Card.Text>
        <Card.Text className="text-info text-uppercase h2">
          {weather?.weather[0]?.description}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default WeatherInfo;
