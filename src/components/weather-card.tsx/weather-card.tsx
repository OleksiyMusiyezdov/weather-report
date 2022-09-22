import React from "react";
import { IPreparedDataItem, IWeather } from "../../interfaces/interfaces";
import "./weather-card.css";

interface IWeatherCardProps {
  dataItem: IPreparedDataItem;
}

export const WeatherCard = ({ dataItem }: IWeatherCardProps) => {
  return (
    <div className="weather-card">
      <h4>Date: {dataItem.day}</h4>
      <div className="row">
        <div className="time" style={{ flex: 1 }}>
          <h5>Time</h5>
          {dataItem.weather.map((w: IWeather) => {
            return <p key={w.time}>{w.time}</p>;
          })}
        </div>
        <div className="rain" style={{ flex: 1 }}>
          <h5>Weather</h5>
          {dataItem.weather.map((w: IWeather) => {
            return <p key={w.time}>{w.rain}</p>;
          })}
        </div>
        <div className="temperature" style={{ flex: 1 }}>
          <h5>t &#8451;</h5>
          {dataItem.weather.map((w: IWeather) => {
            return <p key={w.time}>{w.temperature}</p>;
          })}
        </div>
      </div>
    </div>
  );
};
