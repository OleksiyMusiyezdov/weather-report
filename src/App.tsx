import React, { useState } from "react";
import "./App.css";
import { Weather } from "./components/weather/weather.page";
import { AsyncPaginate } from "react-select-async-paginate";
import {
  geoApiOptions,
  GEO_API_URL,
  WEATHER_API_KEY,
  WEATHER_API_URL,
} from "./api/api";
import { IChoosenCity, IPreparedDataItem } from "./interfaces/interfaces";
import { prepareData } from "./utils/prepareData";
import { Conclusion } from "./components/conclusion/conclusion";

function App() {
  const [choosenCity, setChoosenCity] = useState<IChoosenCity | null>();
  const [forecast, setForecast] = useState(null);

  let data = null;
  if (forecast) {
    data = prepareData(forecast);
  }

  const handleOnChange = (searchData: IChoosenCity | null) => {
    if (searchData !== null) {
      setChoosenCity(searchData);
      const [latitude, longitude] = searchData.value.split(" ");

      fetch(
        `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((response) => {
          setForecast({ city: searchData.label, ...response });
        })
        .catch(console.log);
    }
  };

  const loadOptions = (choosenCity: string) => {
    /* minPopulation=100000& added to reduce complexity/workload */
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${choosenCity}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        const options = response.data.map((city: any) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        });
        return { options: options };
      });
  };

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      width: 500,
      fontSize: 18,
    }),
    option: (styles: any) => ({
      ...styles,
      fontSize: 18,
      background: "white",
      color: "black",
    }),
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Weather report</h2>
        <AsyncPaginate
          styles={customStyles}
          placeholder="Enter the city name"
          debounceTimeout={600}
          value={choosenCity}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </header>
      <Weather data={data as Array<IPreparedDataItem>} />
      <h3>
        You can sell umbrellas on rainy days / You can sell jackets on days with
        temperature is under 18&#8451;
      </h3>
      <Conclusion
        choosenCity={choosenCity as IChoosenCity}
        data={data as Array<IPreparedDataItem>}
      />
    </div>
  );
}

export default App;
