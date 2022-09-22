import React from "react";
import { IPreparedDataItem } from "../../interfaces/interfaces";
import { WeatherCard } from "../weather-card.tsx/weather-card";
import "./weather.css";

interface IWeatherProps {
  data: Array<IPreparedDataItem> | null;
}

export const Weather = ({ data = null }: IWeatherProps) => {
  return (
    <div className="weather">
      {data !== null
        ? data.map((day: IPreparedDataItem) => {
            return <WeatherCard key={day.day} dataItem={day} />;
          })
        : null}
    </div>
  );
};
