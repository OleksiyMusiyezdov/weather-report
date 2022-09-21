import React from "react";

// interface IWeatherCard {}

export const WeatherCard = () => {
  return (
    <div className="weather-card">
      <div className="date">Date</div>
      <div className="temperature">Temperature</div>
      <div className="rain">Rain</div>
      <div className="conclusion">Conclusion</div>
      <p>
        You can sell umbrellas on rainy days / You can sell jackets on days with
        temperature is under 18&#8451;
      </p>
    </div>
  );
};
